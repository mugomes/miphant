// Copyright (C) 2025 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Support: https://www.mugomes.com.br/p/apoie.html

const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const sOS = require('os');
const { spawn, execSync } = require('child_process');
const sHttp = require('http');
const https = require('https');

const sPlatform = sOS.platform().toLowerCase();
const miphantPath = app.getAppPath().replace('app.asar', '');

// Argumentos
let sArgs = process.argv;
let sArgv = '';
if (sArgs[1] == '.') {
    sArgv = sArgs.slice(2).toString();
} else {
    sArgv = sArgs.slice(1).toString();
}

const milangs = require(path.join(app.getAppPath(), '/milang.js'));
const milang = new milangs(sPlatform, miphantPath);

process.on('uncaughtException', (error) => {
    console.error(milang.traduzir('Unhandled exception:'), error);
});

if (!fs.existsSync(path.join(miphantPath, '/app/config/config.json'))) {
    console.error(milang.traduzir('Unable to find file %s', '"config.json"'));

    app.quit();
    return false;
}

const config = JSON.parse(fs.readFileSync(path.join(miphantPath, '/app/config/config.json'), 'utf-8'));

if (config.app.desativarAceleracaoHardware) {
    app.disableHardwareAcceleration();
}

if (config.app.name) {
    app.setName(config.app.name);
}

let miphantIcon = path.join(miphantPath, '/app/icon/', config.app.icon);

if (!fs.existsSync(miphantIcon)) {
    miphantIcon = path.join(app.getAppPath(), '/icon/miphant.png');
}

let sStartApp = true;
let sServerName;
let miphantserverProcess;
let sPort;

function createMenu(sWin, sFileMenu) {
    if (fs.existsSync(path.join(miphantPath, '/app/config/', `${sFileMenu}.json`))) {
        fs.readFile(path.join(miphantPath, '/app/config/', `${sFileMenu}.json`), (err, data) => {
            if (err) {
                console.error(milang.traduzir('Error reading JSON file'), err);
                return;
            }

            const menuData = JSON.parse(data);
            const mainMenu = Menu.buildFromTemplate(getMenuTemplate(sWin, menuData));
            sWin.setMenu(mainMenu);
        });
    } else {
        const mainMenu = Menu.buildFromTemplate(getMenuTemplate(sWin, ''));
        sWin.setMenu(mainMenu);
    }
}

const createWindow = () => {
    miphantNewWindow('', config.app.largura, config.app.altura, config.app.redimensionar, config.app.quadro, false);
}

// Aplica permissão de execução para o MIServidor
function perm(filephp) {
    if (config.server.perm) {
        spawn('chmod', ['+x', filephp]);
        config.server.perm = false;

        fs.writeFileSync(path.join(miphantPath, '/app/config/config.json'), JSON.stringify(config, '', "\t"));

        console.log(milang.traduzir('Applied execution permission to the %s', path.basename(filephp)));
    }
}

// Inicia o MIServidor
function startMiPhantServer(win) {
    let sMiPhantServer;
    let sFilePHPINI = path.join(miphantPath, '/php/php.ini');

    if (sPlatform == 'linux') {
        sMiPhantServer = path.join(miphantPath, '/php/php');
        perm(sMiPhantServer);
    } else if (sPlatform == 'win32') {
        sMiPhantServer = path.join(miphantPath, '/php/php.exe');
    } else {
        app.quit();
    }

    // Environment
    process.env.MIPHANT_ARGV = sArgv;
    process.env.MIPHANT_USERNAME = sOS.userInfo().username;
    process.env.MIPHANT_HOMEDIR = sOS.userInfo().homedir;
    process.env.MIPHANT_PLATFORM = sPlatform;

    // Servidor
    let sCreateServer = sHttp.createServer();
    let sListen = sCreateServer.listen();
    sPort = sListen.address().port;
    sListen.close();
    sCreateServer.close();

    if (config.server.router) {
        miphantserverProcess = spawn(sMiPhantServer, ['-S', '127.0.0.1:' + sPort, '-c', sFilePHPINI, '-t', path.join(miphantPath, '/app/'), path.join(miphantPath, '/app/router.php')], { cwd: process.env.HOME, env: process.env });
    } else {
        miphantserverProcess = spawn(sMiPhantServer, ['-S', '127.0.0.1:' + sPort, '-c', sFilePHPINI, '-t', path.join(miphantPath, '/app/')], { cwd: process.env.HOME, env: process.env });
    }

    miphantserverProcess.on('error', (err) => {
        console.error(milang.traduzir('Error starting the server:'), err);
    });

    miphantserverProcess.on('close', (code) => {
        console.log(milang.traduzir('The server was terminated with the code:'), code);
    });

    if (sPlatform == 'linux') {
        const checkPortL = setInterval(() => {
            let lsof = spawn('lsof', ['-ti:' + sPort]);

            lsof.stdout.on('data', (data) => {
                console.log(milang.traduzir('Server has been started successfully.'));
                sServerName = `http://127.0.0.1:${sPort}/`;
                win.loadURL(sServerName);
                clearInterval(checkPortL);
            });

            lsof.stderr.on('data', (data) => {
                console.error(milang.traduzir('Error when running lsof:'), data);
            });

            lsof.on('close', (code) => {
                if (code !== 0) {
                    console.error(milang.traduzir('lsof exited with error code'), code);
                }
            });
        }, 1000);
    } else if (sPlatform == 'win32') {
        const checkPortW = setInterval(() => {
            let netstat = spawn('netstat', ['-ano']);
            let findstr = spawn('findstr', [':' + sPort]);

            netstat.stdout.on('data', (data) => {
                findstr.stdin.write(data);
            });

            netstat.stderr.on('data', (data) => {
                console.error(milang.traduzir('Error running netstat:'), data);
            });

            netstat.on('close', (code) => {
                if (code !== 0) {
                    console.error(milang.traduzir('netstat exited with error code'), code);
                }
                findstr.stdin.end();
            });

            findstr.stdout.on('data', (data) => {
                console.log(milang.traduzir('PHP server started successfully.'));
                sServerName = `http://127.0.0.1:${sPort}/`;
                win.loadURL(sServerName);
                clearInterval(checkPortW);
            });
        }, 1000);
    }

    miphantserverProcess.unref(); // Permite que o aplicativo seja fechado sem fechar o processo do servidor
}

// Nova Janela
function miphantNewWindow(url, width, height, resizable, frame, hide) {
    let sWidth = (width) ? width : config.app.width;
    let sHeight = (height) ? height : config.app.height;
    let sResizable = (resizable == true || resizable == false) ? resizable : config.app.resizable;
    let sFrame = (frame == true || frame == false) ? frame : config.app.frame;
    let sHide = (hide == true || hide == false) ? hide : false;

    const sNewWindow = new BrowserWindow({
        width: sWidth,
        height: sHeight,
        resizable: sResizable,
        frame: sFrame,
        icon: miphantIcon,
        webPreferences: {
            preload: path.join(app.getAppPath(), '/preload.js'),
        }
    });

    if (sHide) {
        sNewWindow.hide();
    }

    sNewWindow.setMenu(null);

    if (sStartApp) {
        if (fs.existsSync(path.join(miphantPath, '/php/php'))) {
            startMiPhantServer(sNewWindow);
        } else {
            sNewWindow.hide();
            const sNewWindow1 = new BrowserWindow({
                width: 400,
                height: 200,
                resizable: false,
                frame: true,
                icon: path.join(app.getAppPath(), '/icon/miphant.png'),
                webPreferences: {
                    preload: path.join(app.getAppPath(), '/preload.js'),
                }
            });
            sNewWindow1.loadFile(path.join(app.getAppPath(), '/filephp/install.html'));
            sNewWindow1.removeMenu();
            function downloadWithRedirect(url, dest, onProgress) {
                return new Promise((resolve, reject) => {
                    const visited = new Set();

                    function fetch(url, attempt = 0) {
                        if (attempt > 5) return reject(new Error('Too many redirects'));

                        const req = https.get(url, (res) => {
                            // Redirecionamento
                            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                                const redirectUrl = new URL(res.headers.location, url).toString();
                                if (visited.has(redirectUrl)) return reject(new Error('Loop redirection'));
                                visited.add(redirectUrl);
                                fetch(redirectUrl, attempt + 1);
                                return;
                            }

                            // Verifica erro
                            if (res.statusCode !== 200) {
                                return reject(new Error(`Erro HTTP: ${res.statusCode}`));
                            }

                            const total = parseInt(res.headers['content-length'] || '0', 10);
                            let downloaded = 0;

                            const file = fs.createWriteStream(dest);
                            res.on('data', (chunk) => {
                                downloaded += chunk.length;
                                if (onProgress && total > 0) {
                                    const percent = Math.round((downloaded / total) * 100);
                                    onProgress(percent);
                                }
                            });

                            req.on('error', (err) => {
                                app.quit();
                            });

                            res.pipe(file);

                            file.on('finish', () => file.close(resolve));
                            res.on('error', reject);
                        });

                        req.on('error', reject);
                    }

                    fetch(url);
                });
            }

            ipcMain.handle('baixar-php', async (event) => {
                const url = sOS.platform() === 'win32' ? `https://dl.static-php.dev/static-php-cli/windows/${config.server.win32.type}/php-${config.server.win32.version}-cli-win.zip` : `https://dl.static-php.dev/static-php-cli/${config.server.linux.type}/php-${config.server.linux.version}-cli-linux-x86_64.tar.gz`;
                const destDir = path.join(miphantPath, 'php');
                let tmpFile;
                
                if (sOS.platform() === 'win32') {
                    tmpFile = path.join(miphantPath, '/php/php.zip');
                } else {
                    tmpFile = path.join(miphantPath, '/php/php.tar.gz');
                }

                try {
                    await downloadWithRedirect(
                        url,
                        tmpFile,
                        (percent) => event.sender.send('progresso', percent)
                    );

                    fs.mkdirSync(destDir, { recursive: true });
                    if (sOS.platform() === 'win32') {
                        execSync(`powershell -Command "Expand-Archive -Path '${tmpFile}' -DestinationPath '${destDir}'"`);
                    } else {
                        execSync(`tar -xzf ${tmpFile} -C ${destDir}`)                        
                    }
                    fs.unlinkSync(tmpFile);
                    startMiPhantServer(sNewWindow);
                    sNewWindow.show();
                    event.sender.send('progresso', 100);
                    sNewWindow1.close();
                } catch (err) {
                    console.error('Error downloading or extracting:', err);
                    throw err;
                }
            });
        }

        app.on("browser-window-created", (e, sNewWindow) => {
            sNewWindow.removeMenu();
        });

        const mifunctions = require(path.join(app.getAppPath(), '/mifunctions.js'));
        mifunctions.mifunctions(sNewWindow, milang, miphantNewWindow);

        ipcMain.handle('appSair', async (event) => {
            app.quit();
        });

        createMenu(sNewWindow, 'menu');

        sStartApp = false;
    } else {
        sNewWindow.loadURL(`${sServerName}/${url.replace(sServerName, '')}`);
    }

    if (url.replace(sServerName, '') && fs.existsSync(path.join(miphantPath, '/app/config/', url.replace(sServerName, '').replace('.php', '.json')))) {
        createMenu(sNewWindow, url.replace(sServerName, '').replace('.php', ''));
    }

    if (config.dev.tools) {
        sNewWindow.webContents.openDevTools();
    }

    createMenuContext(sNewWindow);

    sNewWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url !== '') {
            miphantNewWindow(`${url}`);

            return { action: 'deny' }
        }

        return { action: 'allow' }
    });
}

// Template de Menu
function getMenuTemplate(win, menuData) {
    let template = [];

    if (config.dev.menu) {
        let devMenu = {
            label: milang.traduzir('Dev'),
            submenu: [
                {
                    label: milang.traduzir('Refresh'),
                    accelerator: 'F5',
                    click: () => {
                        win.reload();
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: milang.traduzir('Tools'),
                    accelerator: 'F12',
                    click: () => {
                        win.openDevTools();
                    }
                }
            ]
        }

        template.push(devMenu);
    }

    // Loop sobre as chaves do objeto JSON
    Object.keys(menuData).forEach((sKey) => {
        let submenu = [];

        // Loop sobre os itens do submenu
        Object.keys(menuData[sKey]).forEach((sSubMenuKey) => {
            let menuItem = {};

            if (sSubMenuKey.indexOf('separator') == 0) {
                menuItem = { type: 'separator' };
            } else {
                menuItem = {
                    label: milang.traduzir(sSubMenuKey),
                    accelerator: menuData[sKey][sSubMenuKey].key,
                    click: () => {
                        // Verifica se é uma página ou URL
                        if (menuData[sKey][sSubMenuKey].page) {
                            if (menuData[sKey][sSubMenuKey].newwindow) {
                                miphantNewWindow(menuData[sKey][sSubMenuKey].page, menuData[sKey][sSubMenuKey].width, menuData[sKey][sSubMenuKey].height, menuData[sKey][sSubMenuKey].resizable, menuData[sKey][sSubMenuKey].frame, menuData[sKey][sSubMenuKey].menu, menuData[sKey][sSubMenuKey].hide)
                            } else {
                                win.loadURL(sServerName + menuData[sKey][sSubMenuKey].page);
                            }
                        } else if (menuData[sKey][sSubMenuKey].url) {
                            require('electron').shell.openExternal(menuData[sKey][sSubMenuKey].url);
                        } else if (menuData[sKey][sSubMenuKey].script) {
                            win.webContents.executeJavaScript(menuData[sKey][sSubMenuKey].script);
                        }
                    }
                };
            }

            submenu.push(menuItem);
        });

        // Adiciona o submenu ao item do menu principal
        template.push({ label: milang.traduzir(sKey), submenu });
    });

    return template;
}

function createMenuContext(win) {
    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({
        label: milang.traduzir('Cut'),
        role: 'cut'
    }));
    contextMenu.append(new MenuItem({
        label: milang.traduzir('Copy'),
        role: 'copy'
    }));
    contextMenu.append(new MenuItem({
        label: milang.traduzir('Paste'),
        role: 'paste'
    }));
    contextMenu.append(new MenuItem({
        type: "separator"
    }));
    contextMenu.append(new MenuItem({
        label: milang.traduzir('Select All'),
        role: 'selectall'
    }));

    win.webContents.on('context-menu', (event, params) => {
        if (params.formControlType == 'input-text' || params.formControlType == 'text-area') {
            contextMenu.popup({
                window: win,
                x: params.x,
                y: params.y
            });
        }
    });
}

// Função para encerrar o processo com base na porta
function killProcessByPort(port) {
    let miServidorClose;
    if (sPlatform == 'linux') {
        miServidorClose = spawn('lsof', ['-ti:' + port, '|', 'xargs', 'kill'], { shell: true });

        miServidorClose.stderr.on('data', (data) => {
            console.log(milang.traduzir('Error terminating process on port:'), sPort);
            return;
        });

        miServidorClose.on('error', (err) => {
            console.error(milang.traduzir('Error terminating process on port:'), port, err.message);
            return;
        });

        miServidorClose.on('close', (code) => {
            console.log(milang.traduzir('The server was terminated with the code:'), code);
            return;
        });

        console.log(milang.traduzir('Process at the port'), port, milang.traduzir('completed successfully.'));
    }
}

function stopMIServidor() {
    if (miphantserverProcess) {
        killProcessByPort(sPort); // Encerra todos os processos do servidor que estão sob a mesma porta
        console.log(milang.traduzir('Server stopped.'));
    }
}

app.whenReady().then(() => {
    createWindow()

    // Enquanto os aplicativos do Linux são encerrados quando não há janelas abertas, os aplicativos do macOS geralmente continuam em execução mesmo sem nenhuma janela aberta, e ativar o aplicativo quando não há janelas disponíveis deve abrir um novo.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

// Para sair do aplicativo no Linux
// Se for MACOS não roda esse comando
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        stopMIServidor();
        app.quit();
    }
});

app.on('before-quit', () => {
    stopMIServidor();
});

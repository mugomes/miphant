// Copyright (C) 2025-2026 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Site: https://www.bluice.com.br

const { ipcMain, dialog, BrowserWindow } = require('electron')

module.exports = {
    mifunctions: function (win, milang, miphantNewWindow) {
        // Função para selecionar pasta
        ipcMain.handle('appSelecionarDiretorio', async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
            if (!canceled) {
                return filePaths[0];
            }
        });

        // Função para abrir arquivo
        ipcMain.handle('appAbrirArquivo', async (_, multi) => {
            let sProperties = [
                'openFile',
                (multi) ? 'multiSelections' : ''
            ]
            const { canceled, filePaths } = await dialog.showOpenDialog({ properties: sProperties });
            if (!canceled) {
                if (multi) {
                    return filePaths;
                } else {
                    return filePaths[0];
                }
            }
        });

        // Função para salvar arquivo
        ipcMain.handle('appSalvarArquivo', async () => {
            const { canceled, filePath } = await dialog.showSaveDialog({});
            if (!canceled) {
                return filePath;
            }
        });

        // Abrir aplicativo externo
        ipcMain.handle('appExterno', async (_, url) => {
            require('electron').shell.openExternal(url);
        });

        // Obter versão do aplicativo e recursos
        ipcMain.handle('appVersao', async (_, tipo) => {
            if (tipo == 'miphant') {
                return require('electron').app.getVersion();
            } else if (tipo == 'electron') {
                return process.versions.electron;
            } else if (tipo == 'node') {
                return process.versions.node;
            } else if (tipo == 'chromium') {
                return process.versions.chrome;
            } else {
                return '';
            }
        });

        // Função para caixa de alerta
        ipcMain.handle('appMessage', async (_, title, msg, type, button) => {
            let sButtons = [button];

            let options = {
                type: type,
                buttons: sButtons,
                defaultId: 1,
                cancelId: 2,
                title: title,
                message: msg
            }
            return dialog.showMessageBoxSync(null, options);
        });

        // Função para caixa de confirmação
        ipcMain.handle('appConfirm', async (_, title, msg, type, ...buttons) => {
            let sButtons = [...buttons];

            let options = {
                type: type,
                buttons: sButtons,
                defaultId: 1,
                cancelId: 2,
                title: title,
                message: msg
            }
            return dialog.showMessageBoxSync(null, options);
        });

        // Abre uma nova janela personalizada
        ipcMain.handle('appNewWindow', async (_, url, width, height, resizable, frame, menu, hide) => {
            miphantNewWindow(url, width, height, resizable, frame, menu, hide);
        });

        // Traduzir
        ipcMain.handle('appTraduzir', async (_, text, ...values) => {
            return milang.traduzir(text, ...values);
        });

        // DevTools
        ipcMain.handle('appDevTools', async (_) => {
            BrowserWindow.getFocusedWindow().webContents.appDevTools();
        });

        // Notification
        ipcMain.handle('appNotification', async (_, title, text) => {
            let { Notification } = require('electron');
            new Notification({ title: title, body: text }).show();
        });

        // Tray
        let sTrayExists = false;
        ipcMain.handle('appTray', async (_, title, tooltip, image, menus) => {
            if (!sTrayExists) {
                const { Tray, Menu, nativeImage } = require('electron');
                const icon = nativeImage.createFromPath(image);
                let tray = new Tray(icon);

                let template = [];

                let menuData = JSON.parse(menus);

                Object.keys(menuData).forEach((key) => {
                    template.push({
                        label: milang.traduzir(key),
                        type: menuData[key].type,
                        click: () => {
                            if (menuData[key].page) {
                                if (menuData[key].newwindow) {
                                    win.webContents.executeJavaScript(`window.open('${menuData[key].page}');`);
                                } else {
                                    win.webContents.executeJavaScript(`window.location.assign('${menuData[key].page}');`);
                                }
                            } else {
                                win.webContents.executeJavaScript(menuData[key].script);
                            }
                        }
                    });
                });

                const contextMenu = Menu.buildFromTemplate(template);
                tray.setContextMenu(contextMenu);
                tray.setToolTip(tooltip);
                tray.setTitle(title);

                sTrayExists = true;
            }
        });

        // Check File Exists
        ipcMain.handle('appFileExists', async(_, filename) => {
            return require('fs').existsSync(filename);
        });

        // ExportPDF
        ipcMain.handle('appExportPDF', async (_, filename, options) => {
            const fs = require('fs');

            let pdfOptions = options;
            if (!pdfOptions) {
                pdfOptions = {
                    pageSize: 'A4'
                };
            }

            BrowserWindow.getFocusedWindow().webContents.printToPDF(pdfOptions).then(data => {
                const sPath = require('path').dirname(filename);
                if (!fs.existsSync(sPath)) {
                    fs.mkdirSync(sPath);
                }

                fs.writeFile(filename, data, (error) => {
                    if (error) throw error
                    console.log(milang.traduzir('PDF successfully saved to %s', filename))
                })
            }).catch(error => {
                console.log(milang.traduzir('Error when trying to generate the PDF in %s', filename), error)
            })
        });
    }
}

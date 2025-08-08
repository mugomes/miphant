// Copyright (C) 2025 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Support: https://www.mugomes.com.br/p/apoie.html

const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.setMaxListeners(20);

contextBridge.exposeInMainWorld('miphant', {
    version: (type) => ipcRenderer.invoke('appVersao', type),
    alert: (title, msg, type, button) => ipcRenderer.invoke('appMessage', title, msg, type, button),
    confirm: (title, msg, type, ...buttons) => ipcRenderer.invoke('appConfirm', title, msg, type, ...buttons),
    newWindow: (url, width, height, resizable, frame, menu, hide) => ipcRenderer.invoke('appNewWindow', url, width, height, resizable, frame, menu, hide),
    openURL: (url) => ipcRenderer.invoke('appExterno', url),
    translate: (text, ...values) => ipcRenderer.invoke('appTraduzir', text, ...values),
    selectDirectory: () => ipcRenderer.invoke('appSelecionarDiretorio'),
    openFile: () => ipcRenderer.invoke('appAbrirArquivo'),
    saveFile: () => ipcRenderer.invoke('appSalvarArquivo'),
    notification: (title, text) => ipcRenderer.invoke('appNotification', title, text),
    tray: (title, tooltip, icon, menu) => ipcRenderer.invoke('appTray', title, tooltip, icon, menu),
    exportPDF: (filename, options) => ipcRenderer.invoke('appExportPDF', filename, options),
    devTools: () => ipcRenderer.invoke('appDevTools'),
    close: () => ipcRenderer.invoke('appSair'),
    baixarPHP: () => ipcRenderer.invoke('baixar-php'),
    onProgresso: (cb) => ipcRenderer.on('progresso', (e, val) => cb(val)),
    downloadCompleto: () => ipcRenderer.send('download-complete'),
});
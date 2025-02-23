const { contextBridge, ipcRenderer } = require('electron')

// expose clipboard API to renderer process
contextBridge.exposeInMainWorld('clipboard', {
  writeTextToClipboard: text => ipcRenderer.send('write-text-to-clipboard', { text }),
});
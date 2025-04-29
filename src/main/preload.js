const { contextBridge, ipcRenderer } = require('electron')

// expose clipboard API to renderer process
contextBridge.exposeInMainWorld('clipboard', {
  writeCharacter: character => ipcRenderer.send('write-character', { character }),
});
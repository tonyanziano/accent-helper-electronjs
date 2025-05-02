const { contextBridge } = require('electron')

// expose version info to about dialog
contextBridge.exposeInMainWorld('version', {
  app: process.argv.pop(), // app version is passed in as an additional argument, see showAboutWindow.ts
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node,
  os: process.getSystemVersion()
});
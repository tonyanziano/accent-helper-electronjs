const { join } = require('path');
const { app, BrowserWindow, ipcMain, clipboard } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    }
  });

  win.loadFile(join(__dirname, '../browser/index.html'));
};

// setup IPC handlers
ipcMain.on('write-text-to-clipboard', (_ev, { text }) => {
  clipboard.writeText(text);
  console.log(`Wrote ${text} to clipboard.`);
});

app.whenReady().then(() => {
  createWindow();
});

const { join } = require('path');
const { app, BrowserWindow, ipcMain, clipboard, Menu } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    frame: false, // we want a frameless window
    width: 350,
    height: 150,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    }
  });

  win.loadFile(join(__dirname, '../renderer/index.html'));
};

// setup IPC handlers
ipcMain.on('write-text-to-clipboard', (_ev, { text }) => {
  clipboard.writeText(text);
  console.log(`Wrote ${text} to clipboard.`);
});

// hide the menu bar
Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createWindow();
});

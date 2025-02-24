const { join } = require('path');
const { app, BrowserWindow, ipcMain, clipboard, Menu, globalShortcut, screen } = require('electron');
const { WINDOW_HEIGHT, WINDOW_WIDTH, CURSOR_OFFSET_X, CURSOR_OFFSET_Y } = require('./constants');

let win;
const createWindow = () => {
  win = new BrowserWindow({
    frame: false, // we want a frameless window
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
    icon: join(__dirname, '../../resources/256x256-icon.ico'),
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
  // setup shortcuts
  globalShortcut.register('CommandOrControl+Shift+`', () => {
    console.log('Got global shortcut for tilde');
    if (!win) {
      return;
    }

    // get the cursor's position to calculate where to place the window
    const { x: cursorX, y: cursorY } = screen.getCursorScreenPoint();

    // toggle with window visibility
    if (win.isVisible()) {
      win.hide();
    } else {
      win.setPosition(cursorX + CURSOR_OFFSET_X, cursorY + CURSOR_OFFSET_Y);
      win.show();
    }
  });

  createWindow();
});

// cleanup on quit
app.on('quit', globalShortcut.unregisterAll);

import { join } from 'path';
import { app, BrowserWindow, ipcMain, clipboard, Menu, globalShortcut, screen, Tray } from 'electron';
import { WINDOW_HEIGHT, WINDOW_WIDTH, CURSOR_OFFSET_X, CURSOR_OFFSET_Y } from './constants';
import { handleSquirrelStartupEvents } from './handleSquirrelStartupEvents';

// TODO: persist this in settings somewhere
let enabled = true;

let win: BrowserWindow | undefined;
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

  win.loadFile(join(__dirname, '../../dist/index.html'));
};

// setup IPC handlers
ipcMain.on('write-text-to-clipboard', (_ev, { text }) => {
  clipboard.writeText(text);
  console.log(`Wrote ${text} to clipboard.`);
});

// hide the menu bar
Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  // handle first-time startup events from the squirrel installer / update / uninstall flow
  if (handleSquirrelStartupEvents(app)) {
    process.exit();;
  }

  // create entry for system tray
  const trayIconPath = app.isPackaged ? join(__dirname, '../resources/32x32-icon.ico') : join(__dirname, '../../resources/32x32-icon.ico'); 
  const tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Enable', type: 'radio', checked: enabled, click: () => enabled = true },
    { label: 'Disable', type: 'radio', checked: !enabled, click: () => {
        enabled = false;
        if (win?.isVisible()) {
          win.hide();
        }
      }
    },
    { type: 'separator' },
    { label: 'Quit AccentHelper', click: app.quit }
  ]);
  tray.setToolTip('AccentHelper');
  tray.setContextMenu(contextMenu);

  // setup shortcuts
  globalShortcut.register('CommandOrControl+Shift+`', () => {
    console.log('Got global shortcut for tilde');
    if (!win || !enabled) {
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

app.on('will-quit', () => {
  // cleanup shortcuts on quit
  globalShortcut.unregisterAll();
});

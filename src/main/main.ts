import { join } from 'path';
import { app, BrowserWindow, ipcMain, clipboard, Menu, globalShortcut, screen, Tray } from 'electron';
import { WINDOW_HEIGHT, WINDOW_WIDTH, CURSOR_OFFSET_X, CURSOR_OFFSET_Y } from './constants';
import { handleSquirrelStartupEvents } from './handleSquirrelStartupEvents';
import { uIOhook, UiohookKey } from 'uiohook-napi';
import { registerShortcutsForCharacters } from './registerShortcutsForCharacters';
import { getStateManager } from './inMemoryStateManager';

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
ipcMain.on('write-character', (_ev, { character }) => {
  // write character to clipboard then simulate "Ctrl + V" to paste to currently active application
  clipboard.writeText(character);
  console.log(`Wrote ${character} to clipboard.`);
  win?.blur(); // put focus back on previous window
  uIOhook.keyTap(UiohookKey.V, [UiohookKey.Ctrl]);
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
    { label: 'Enable', type: 'radio', checked: getStateManager().appEnabled, click: () => {
        getStateManager().appEnabled = true;
        if (!(win?.isVisible())) {
          win?.show();
        } 
      }
    },
    { label: 'Disable', type: 'radio', checked: !getStateManager().appEnabled, click: () => {
        getStateManager().appEnabled = false;
        if (win?.isVisible()) {
          win?.hide();
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
    if (!win || !getStateManager().appEnabled) {
      return;
    }

    // get the cursor's position to calculate where to place the window
    const { x: cursorX, y: cursorY } = screen.getCursorScreenPoint();
    win.setPosition(cursorX + CURSOR_OFFSET_X, cursorY + CURSOR_OFFSET_Y);
    win.focus();
  });
  // TODO: enable once we figure out better UX
  // registerShortcutsForCharacters();

  uIOhook.start();

  createWindow();
});

app.on('will-quit', () => {
  // cleanup shortcuts on quit
  globalShortcut.unregisterAll();
  uIOhook.stop();
});

import { app, BrowserWindow } from "electron";
import { join } from 'path';

let win: BrowserWindow | undefined;
const createWindow = () => {
  win = new BrowserWindow({
    frame: true,
    width: 550,
    height: 400,
    icon: join(__dirname, '../../resources/256x256-icon.ico'),
    webPreferences: {
      additionalArguments: [app.getVersion()], // expose the app version to preload script
      preload: join(__dirname, 'preload-about.js'),
      
    },
  });

  win.loadFile(join(__dirname, '../../dist/about.html'));
};

export const showAboutWindow = () => {
  if (!win) {
    createWindow();
  } else {
    win.show();
  }
};
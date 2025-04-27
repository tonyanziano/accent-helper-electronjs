import { resolve, dirname, basename } from 'path';
import { spawn } from 'child_process';
import { App } from 'electron';

// adapted from https://github.com/mongodb-js/electron-squirrel-startup/blob/master/index.js
const run = function(args: string[], done: () => void) {
  const updateExe = resolve(dirname(process.execPath), '..', 'Update.exe');
  console.log(`Spawning ${updateExe} with args ${args}`);
  spawn(updateExe, args, {
    detached: true
  }).on('close', done);
};

export const handleSquirrelStartupEvents = (app: App) => {
  if (process.platform === 'win32') {
    const cmd = process.argv[1];
    console.log(`processing squirrel command ${cmd}`);
    const target = basename(process.execPath);

    if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
      run(['--createShortcut=' + target + ''], app.quit);
      return true;
    }
    if (cmd === '--squirrel-uninstall') {
      run(['--removeShortcut=' + target + ''], app.quit);
      return true;
    }
    if (cmd === '--squirrel-obsolete') {
      app.quit();
      return true;
    }
  }
  return false;
};
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 320, height: 480, fullscreen: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('speak', (e, text) => {
  exec(`espeak "${text.replace(/"/g, '')}"`);
  e.reply('spoken', text);
});

// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const interpret = require('./core/interpreter');
const { exec } = require('child_process');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 480,
    height: 320,
    icon: path.join(__dirname, 'jarvis-icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle('process-input', async (e, input) => {
  const response = await interpret(input);
  return response;
});

ipcMain.on('speak-text', (e, text) => {
  exec(`espeak "${text}"`);
});

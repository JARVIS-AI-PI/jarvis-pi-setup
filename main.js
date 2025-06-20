// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const interpreter = require('./core/interpreter'); // Main brain logic

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480, // Your 2.8-inch display size
    height: 320,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'jarvis-icon.png'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On Raspberry Pi, keep app running unless closed manually
  if (process.platform !== 'darwin') app.quit();
});

// IPC from renderer (index.html UI) → Node backend
ipcMain.handle('process-input', async (event, userInput) => {
  const result = await interpreter(userInput);
  return result;
});

ipcMain.on('speak-text', (event, text) => {
  const { exec } = require('child_process');
  exec(`espeak "${text.replace(/"/g, '')}"`);
});

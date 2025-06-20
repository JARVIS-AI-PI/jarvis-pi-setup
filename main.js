// main.js (Electron Main Process)
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const interpret = require('./core/interpreter');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 480, height: 320,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);

ipcMain.handle('process-input', async (e, input) => {
  const say = (text) => win.webContents.send('voice-output', text);
  const result = await interpret(input, say);
  return result;
});

ipcMain.on('speak-text', (e, text) => {
  require('child_process').exec(`espeak "${text}"`);
});

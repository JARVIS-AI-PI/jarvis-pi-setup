const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const say = require('say');

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 320,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.setMenu(null);
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle messages from UI
ipcMain.on('user-input', (event, message) => {
  const msg = message.toLowerCase().trim();
  if (msg.startsWith("jarvis")) {
    const command = msg.replace("jarvis", "").trim();
    if (command.includes("open terminal")) exec("lxterminal");
    else if (command.includes("say hello")) say.speak("Hello, I am Jarvis.");
    else say.speak("This is a demo response. I heard: " + command);
  }
});

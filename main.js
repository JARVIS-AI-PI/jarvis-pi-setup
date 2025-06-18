const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 320,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'icon.png'),
    title: "Jarvis AI",
    autoHideMenuBar: true,
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.handle('jarvis-command', async (event, userInput) => {
  // You can replace this logic with advanced AI / Python calls
  let response = "This is a demo response.";

  // Simple examples:
  if (userInput.toLowerCase().includes("hello")) {
    response = "Hi there! I'm Jarvis.";
  } else if (userInput.toLowerCase().includes("open terminal")) {
    require('child_process').exec('lxterminal');
    response = "Opening terminal for you!";
  } else if (userInput.toLowerCase().includes("create note")) {
    require('fs').writeFileSync("note.txt", "This is a new note created by Jarvis.");
    response = "Note created successfully.";
  }

  return response;
});

const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { interpret } = require("./core/interpreter");

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 320,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    icon: path.join(__dirname, "assets/icon.png"),
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

// Handle user input from the renderer (index.html)
ipcMain.on("user-input", (event, command) => {
  console.log("User said:", command);

  // Response callback
  function respond(responseText) {
    event.reply("bot-response", responseText);
    // Also speak it
    exec(`python3 speak-output.py "${responseText}"`);
  }

  interpret(command, respond);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

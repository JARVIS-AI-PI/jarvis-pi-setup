const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("jarvis", {
  sendCommand: (command) => ipcRenderer.send("user-input", command),
  onResponse: (callback) => ipcRenderer.on("bot-response", (event, response) => callback(response))
});

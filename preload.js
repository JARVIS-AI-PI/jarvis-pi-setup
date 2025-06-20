// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('jarvis', {
  process: async (input) => await ipcRenderer.invoke('process-input', input),
  speak: (text) => ipcRenderer.send('speak-text', text),
});

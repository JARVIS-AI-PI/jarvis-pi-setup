const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('jarvis', {
  process: (input) => ipcRenderer.invoke('process-input', input),
  speak: (text) => ipcRenderer.send('speak-text', text),
  onVoiceOutput: (callback) => ipcRenderer.on('voice-output', (event, data) => callback(data))
});

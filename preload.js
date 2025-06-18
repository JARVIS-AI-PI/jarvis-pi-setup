const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('jarvisAPI', {
  sendMessage: (msg) => ipcRenderer.send('user-message', msg),
  onReply: (callback) => ipcRenderer.on('jarvis-reply', (_, response) => callback(response))
});

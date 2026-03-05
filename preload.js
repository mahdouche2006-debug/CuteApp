const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-window'),
  minimizeApp: () => ipcRenderer.send('minimize-window') // Optional: Add minimize functionality
});
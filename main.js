const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 440,
        height: 550,
        resizable: false,
        transparent: false,
        frame: false,
        fullscreen: false,
        maximizable: false,

        icon: path.join(__dirname, 'images/icon.png'),

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Link the bridge
            contextIsolation: true
        },
    });

    win.loadFile('index.html');

    // Listen for the close command from the button
    ipcMain.on('close-window', () => {
        console.log("Close signal received!");
        app.quit();
    });

    // Optional: Listen for the minimize command from the button
    ipcMain.on('minimize-window', () => {
        console.log("Minimize signal received!");
        win.minimize();
    });
}

app.whenReady().then(createWindow);
import { app, BrowserWindow } from 'electron';

let main;
app.on('ready', () => {
    main = new BrowserWindow({
        title: 'Random Browser - Loading...',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
});
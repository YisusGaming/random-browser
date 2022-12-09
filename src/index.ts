import { app, BrowserWindow } from 'electron';
import path from 'path';

const publicPath = path.join(__dirname, 'public');

let main : BrowserWindow;
app.on('ready', () => {
    main = new BrowserWindow({
        title: 'Random Browser - Loading...',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });
    main.loadFile(path.join(publicPath, 'index.html'));
    main.on('ready-to-show', () => main.show());
});
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

const publicPath = path.join(__dirname, 'public');

let main : BrowserWindow;
let searchWin : BrowserWindow;
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

function searchWindow(url: string) {
    searchWin = new BrowserWindow({
        title: `Searching ${url}...`
    });
    searchWin.setMenu(null);
    searchWin.loadURL(url);
}

/* IPC */
ipcMain.on('new-search', (event, search: string) => {
    searchWindow(`https://google.com/search?q=${search}`);
});
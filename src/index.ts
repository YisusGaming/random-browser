import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from 'electron';
import configs from './config/app.json';
import './config/user.json';
import fs from 'fs';
import path from 'path';

const publicPath = path.join(__dirname, 'public');
const userConfigPath = path.join(__dirname, 'config', 'user.json');
console.log(`Looking for user's configs in ${userConfigPath}`);

let main : BrowserWindow;
let searchWin : BrowserWindow;
let backgroundSelect : BrowserWindow;
app.on('ready', () => {
    main = new BrowserWindow({
        title: 'Random Browser - Loading...',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });
    Menu.setApplicationMenu(null);
    main.loadFile(path.join(publicPath, 'index.html'));
    main.on('ready-to-show', () => {
        main.show();
        main.maximize();

        const rawConfig = fs.readFileSync(userConfigPath, { encoding: 'utf-8' });
        const configs = JSON.parse(rawConfig);

        main.webContents.send('update-background', configs.background);
    });
});

function searchWindow(url: string) {
    searchWin = new BrowserWindow({
        title: `Searching ${url}...`,
        minimizable: false
    });
    searchWin.loadURL(url);

    const menuTemplate: Array<MenuItemConstructorOptions> = [
        {
            label: 'Refresh',
            role: 'reload'
        },
        {
            label: 'Inspect',
            role: 'toggleDevTools'
        }
    ]

    searchWin.setMenu(Menu.buildFromTemplate(menuTemplate));
}

function selectBackground() {
    backgroundSelect = new BrowserWindow({
        title: "Change Browser's Background",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        minimizable: false,
        maximizable: false
    });
    backgroundSelect.setMenu(null);
    backgroundSelect.loadFile(path.join(publicPath, 'background.html'));
}

/* IPC */
ipcMain.on('new-search', (event, search: string) => {
    if (search.trim() == '') return;

    if (/[*.*]/g.test(search)) {
        if (search.startsWith('https://') || search.startsWith('http://')) {
            searchWindow(search);
            return;
        }
        searchWindow(`https://${search}`);
        return;
    }
    
    searchWindow(`https://google.com/search?q=${search}`);
});

ipcMain.on('new-background-image', (event) => {
    selectBackground();
});

ipcMain.on('set-background', (event, file: string) => {
    const rawConfig = fs.readFileSync(userConfigPath, { encoding: 'utf-8' });
    const config = JSON.parse(rawConfig);

    const newConfig = {
        ...config,
        background: file
    }
    fs.writeFileSync(userConfigPath, JSON.stringify(newConfig, null, 4), { encoding: 'utf-8' });
    backgroundSelect.close();
    main.webContents.send('update-background', file);
});

ipcMain.on('req-version', (event) => {
    main.webContents.send('app-version', configs.version);
});

ipcMain.on('clear-background', (event) => {
    console.log('Event: Clear Background Image');
});
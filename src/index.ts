import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from 'electron';
import Logger from './logs/Logger.js';
import TabManager from './tabs/TabManager.js';
import configs from './config/app.json';
import './config/user.json';
import fs from 'fs';
import path from 'path';

const logger = new Logger(configs.version); // Instance of the logger class for future console logs.

const publicPath = path.join(__dirname, 'public');
const userConfigPath = path.join(__dirname, 'config', 'user.json');
// console.log(`Looking for user's configs in ${userConfigPath}`);
logger.logMessage(`Looking for user's configs in ${userConfigPath}`);

let main : BrowserWindow;
let tabModal : BrowserWindow;
let backgroundSelect : BrowserWindow;
app.on('ready', () => {
    logger.logMessage(`App is ready.`);
    main = new BrowserWindow({
        title: 'Random Browser - Loading...',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false,
        show: false
    });
    Menu.setApplicationMenu(null);
    main.loadFile(path.join(publicPath, 'index.html'));
    main.on('ready-to-show', () => {
        logger.logMessage(`Main window ready to show.`);
        main.show();
        main.maximize();

        const rawConfig = fs.readFileSync(userConfigPath, { encoding: 'utf-8' });
        const configs = JSON.parse(rawConfig);

        main.webContents.send('update-background', configs.background);
    });
});

function spawnTab(url: string) {
    // Create a new tab and right after build it so the tab shows up.
    tabModal = TabManager.createTab(url, path.join(publicPath, 'tab.html'), main).build();
}

function selectBackground() {
    backgroundSelect = new BrowserWindow({
        title: "Change Browser's Background",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        minimizable: false,
        maximizable: false,
        parent: main
    });
    backgroundSelect.setMenu(null);
    backgroundSelect.loadFile(path.join(publicPath, 'background.html'));
}

ipcMain.on('minimize-main', (event) => {
    // Minimize the main window
    main.minimize();
});

ipcMain.on('maximize-main', (event) => {
    // Maximize the main window
    main.maximize();
});

ipcMain.on('close-main', (event) => {
    // Close the main window
    main.close();
});

ipcMain.on('new-search', (event, search: string) => {
    if (search.trim() == '') return;

    if (/[*.*]/g.test(search)) {
        if (search.startsWith('https://') || search.startsWith('http://')) {
            spawnTab(search);
            return;
        }
        spawnTab(`https://${search}`);
        return;
    }
    
    spawnTab(`https://google.com/search?q=${search}`);
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
    const rawConfig = fs.readFileSync(userConfigPath, { encoding: 'utf-8' });
    const config = JSON.parse(rawConfig);

    const newConfig = {
        ...config,
        background: ''
    }
    fs.writeFileSync(userConfigPath, JSON.stringify(newConfig, null, 4), { encoding: 'utf-8' });
    backgroundSelect.close();
    main.webContents.send('update-background', '');
    main.loadFile(path.join(publicPath, 'index.html'));
});
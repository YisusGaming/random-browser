import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from 'electron';
import Logger from './logs/Logger.js';
import TabManager from './tabs/TabManager.js';
import configs from './config/app.json';
import './config/user.json';
import fs from 'fs';
import path from 'path';

// Instance of the logger class for future console logs.
// Also exports the instance for use in other files
// without the need to reinstance the class again.
export const logger = new Logger(configs.version);

const publicPath = path.join(__dirname, 'public');
const userConfigPath = path.join(__dirname, 'config', 'user.json');
// console.log(`Looking for user's configs in ${userConfigPath}`);
logger.logMessage(`Looking for user's configs in ${userConfigPath}`);

let main : BrowserWindow;
let tabModal : BrowserWindow;
let backgroundSelect : BrowserWindow;
let appLoader : BrowserWindow;
app.on('ready', () => {
    logger.logMessage(`App is ready.`);
    spawnAppLoader();
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
        // ! Make sure to destoy appLoader on production.
        // appLoader.destroy();
        main.maximize();

        const rawConfig = fs.readFileSync(userConfigPath, { encoding: 'utf-8' });
        const configs = JSON.parse(rawConfig);

        main.webContents.send('update-background', configs.background);
    });
});

function spawnAppLoader() {
    logger.logMessage("App loader spawned.");
    appLoader = new BrowserWindow({
        title: 'Random Browser - Loading...',
        closable: false,
        maximizable: false,
        resizable: false,
        height: 400,
        width: 320
    });
    appLoader.loadFile(path.join(publicPath, 'loader.html'));
    appLoader.on('closed', () => {
        logger.logMessage("App loader closed.");
        main.flashFrame(true);
    });
}

function spawnTab(url: string) {
    // Create a new tab and right after build it so the tab shows up.
    tabModal = TabManager.createTab(url, main).build();
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

ipcMain.on('open-tab', (event, tabId: number) => {
    TabManager.openTab(tabId);
});

ipcMain.on('tab-deleted', (event, tabId: number) => {
    TabManager.deleteTab(tabId);
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
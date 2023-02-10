import { BrowserWindow } from 'electron';
import BrowserTab from './BrowserTab.js';

class TabManager {
    private tabs: BrowserTab[];
    constructor() {
        this.tabs = [];
    }

    /**
     * Creates a new tab and stores it in a list of tabs.
     * @param url The URL the tab is pointing to.
     * @param tabHtmlPath The path to the `tab.html` file.
     * @param parent The parent of this modal. It should be the main browser's window.
     * @param tabId A zero-based id that identifies this tab.
     */
    public createTab(url: string, tabHtmlPath: string, parent: BrowserWindow): BrowserTab {
        let tabId = this.tabs.length;
        let tab = new BrowserTab(url, tabHtmlPath, parent, tabId);
        this.tabs.push(tab);

        return tab;
    }
}

export default new TabManager();

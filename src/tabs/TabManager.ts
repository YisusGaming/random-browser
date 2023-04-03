import { BrowserWindow } from 'electron';
import BrowserTab from './BrowserTab.js';

class TabManager {
    private tabs: BrowserTab[];
    constructor() {
        this.tabs = [];
    }

    /**
     * Creates a new tab and stores it in a list of tabs.
     */
    public createTab(url: string, parent: BrowserWindow): BrowserTab {
        let tabId = this.tabs.length;
        let tab = new BrowserTab(url, parent, tabId);
        this.tabs.push(tab);

        return tab;
    }

    public deleteTab(tabId: number) {
        this.tabs.filter((tab) => {
            tab.TabId != tabId;
        });
        console.log(this.tabs);
    }
}

export default new TabManager();

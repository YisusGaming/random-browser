import { BrowserWindow } from 'electron';
import BrowserTab from './BrowserTab.js';
import { logger } from '../index.js';

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

    /**
     * Opens a tab, previously created and stored in the
     * tabs array.
     */
    public openTab(tabId: number): void {
        let tabIndex = this.tabs.findIndex((val, index) => {
            return val.TabId == tabId;
        });
        let tab = this.tabs[tabIndex];
        if (tab) {
            tab.build();
        } else {
            logger.logError(`TAB NOT FOUND. Tab id ${tabId} was not found.`, {
                file: 'TabManager.ts',
                line: 27
            });
        }
    }

    /**
     * Deletes a tab from the tab list.
     */
    public deleteTab(tabId: number): void {
        this.tabs = this.tabs.filter((tab, index) => {
            return tab.TabId != tabId;
        });
    }
}

export default new TabManager();

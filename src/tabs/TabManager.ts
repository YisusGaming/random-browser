import { BrowserWindow } from 'electron';
import BrowserTab from './BrowserTab.js';
import { logger } from '../index.js';

/**
 * TabManager class
 * @since v2.0.0
 * 
 * Manages all the tab system.
 */
class TabManager {
    private tabs: BrowserTab[];
    constructor() {
        this.tabs = [];
    }

    /**
     * Creates a new tab and stores it in a list of tabs.
     * @param url The url that the tab will load.
     * @param parent The parent of this tab. In most cases it'll be the main browser's window.
     */
    public createTab(url: string, parent: BrowserWindow): BrowserTab {
        let tabId = this.generateId();
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
                file: 'TabManager.ts'
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

    /**
     * Generates an unique ID for a tab.
     */
    private generateId(): number {
        let ids : Array<number> = [];
        this.tabs.forEach((tab) => {
            ids.push(tab.TabId);
        });

        ids.sort(); // Sort in a way that the bigger ID is the last element of the array.
        return ids.pop()! + 1 || 0; // Return the last element of the array (bigger id) + 1, or return 0 if the array is empty.
    }
}

export default new TabManager();

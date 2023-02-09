import { BrowserWindow } from "electron";
import BrowserTab from "./BrowserTab.js";

class TabManager {
    private tabs: BrowserTab[];
    constructor() {
        this.tabs = [];
    }

    /**
     * Creates a new tab and stores it in a list of tabs.
     */
    public createTab(url: string, parent: BrowserWindow): BrowserTab {
        let tab = new BrowserTab(url, parent);
        this.tabs.push(tab);

        return tab;
    }
}

export default new TabManager();
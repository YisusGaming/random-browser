import BrowserTab from "./BrowserTab.js";

class TabManager {
    #tabs: BrowserTab[];
    #activeTab: number
    constructor() {
        this.#tabs = [];
        this.#activeTab = 0;
    }

    createNewTab(url: string) : BrowserTab {
        let id = this.#tabs.length - 1;
        let tab = new BrowserTab(url, id >= 0 ? id : 0);
        this.#tabs.push(tab);

        return tab;
    }

    updateActiveTab(tabId: number) {
        this.#activeTab = tabId;
    }
}

export default new TabManager();
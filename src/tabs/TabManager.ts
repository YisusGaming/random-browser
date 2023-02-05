import BrowserTab from "./BrowserTab.js";

class TabManager {
    #tabs: BrowserTab[];
    #activeTab: number
    constructor() {
        this.#tabs = [];
        this.#activeTab = 0;
    }

    createNewTab(url: string, id: number) : BrowserTab {
        let tab = new BrowserTab(url, id);
        this.#tabs.push(tab);

        return tab;
    }
}

export default new TabManager();
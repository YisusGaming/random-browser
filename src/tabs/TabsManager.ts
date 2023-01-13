import BrowserTab from "./BrowserTab.js";

export default class TabsManager {
    static createTab(url: string, title?: string) : BrowserTab {
        return new BrowserTab(url);
    }
}
import { BrowserWindow, DownloadItem, Event, WebContents } from "electron";

class DownloadHandler {
    /**
     * Handles downloads in tabs,
     * this function should be called in a `will-download` electron event.
     */
    public handleDownload(event: Event, item: DownloadItem, webContents: WebContents, tab: BrowserWindow): void {

    }
}

export default new DownloadHandler();
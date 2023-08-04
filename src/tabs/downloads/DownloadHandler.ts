import { BrowserWindow, DownloadItem, Event, WebContents } from "electron";
import { logger, mainWindowGateway } from "../../index.js";

/**
 * DownloadHandler class
 * @since v2.0.0
 * 
 * Handles downloads, typically triggered in tabs.
 */
class DownloadHandler {

    private activeDownloads: {id: number, filename: string}[] = [];

    /**
     * Handles downloads in tabs,
     * this function should be called in a `will-download` electron event.
     */
    public handleDownload(event: Event, item: DownloadItem, webContents: WebContents, tab: BrowserWindow): void {
        logger.logMessage(`Download triggered.`);
        
        this.activeDownloads.push({
            id: this.generateId(),
            filename: item.getFilename()
        });
        mainWindowGateway('new-active-download', this.activeDownloads);

        item.on('updated', (event, state) => {
            if (state == 'interrupted') {
                logger.logWarning("Donwload interrupted but can be resumed.");
            } else if (state == 'progressing') {
                if (item.isPaused()) {
                    logger.logMessage("Download paused.");
                } else {
                    logger.logMessage(`Download progress:\n${item.getReceivedBytes()} bytes out of ${item.getTotalBytes()}`);
                }
            }
        });

        item.once('done', (event, state) => {
            if (state == 'completed') {
                logger.logMessage(`Download completed succesfully.`);
            } else {
                logger.logWarning(`Download failed: ${state}`);
            }
        });
    }

    /**
     * Generates an unique ID for a tab.
     */
    private generateId(): number {
        let ids : Array<number> = [];
        this.activeDownloads.forEach((download) => {
            ids.push(download.id);
        });

        ids.sort(); // Sort in a way that the bigger ID is the last element of the array.
        return ids.pop()! + 1 || 0; // Return the last element of the array (bigger id) + 1, or return 0 if the array is empty.
    }
}

export default new DownloadHandler();
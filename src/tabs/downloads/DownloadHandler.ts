import { BrowserWindow, DownloadItem, Event, WebContents } from "electron";
import { logger } from "../../index.js";

export interface Download {
    id: number;
    filename: string,
    totalBytes: number,
    receivedBytes: number
}

/**
 * DownloadHandler class
 * @since v2.0.0
 * 
 * Handles downloads, typically triggered in tabs.
 */
class DownloadHandler {

    private activeDownloads: Download[] = [];

    /**
     * Handles downloads in tabs,
     * this function should be called in a `will-download` electron event.
     */
    public handleDownload(event: Event, item: DownloadItem, webContents: WebContents, tab: BrowserWindow): void {
        logger.logMessage(`Download triggered.`);

        this.activeDownloads.push({
            id: this.generateId(),
            filename: item.getFilename(),
            totalBytes: item.getTotalBytes(),
            receivedBytes: item.getReceivedBytes()
        });

        item.on('updated', (event, state) => {
            if (state == 'interrupted') {
                // logger.logWarning("Donwload interrupted but can be resumed.");
            } else if (state == 'progressing') {
                if (item.isPaused()) {
                    // logger.logMessage("Download paused.");
                } else {
                    // logger.logMessage(`Download progress:\n${item.getReceivedBytes()} bytes out of ${item.getTotalBytes()}`);
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
     * Generates an unique ID for a download.
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
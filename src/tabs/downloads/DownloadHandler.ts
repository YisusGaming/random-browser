import { BrowserWindow, DownloadItem, Event, WebContents } from "electron";
import { logger } from "../../index.js";

/**
 * DownloadHandler class
 * @since v2.0.0
 * 
 * Handles downloads, typically triggered in tabs.
 */
class DownloadHandler {
    /**
     * Handles downloads in tabs,
     * this function should be called in a `will-download` electron event.
     */
    public handleDownload(event: Event, item: DownloadItem, webContents: WebContents, tab: BrowserWindow): void {
        logger.logMessage(`Download triggered.`);
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
}

export default new DownloadHandler();
import { DownloadItem, BrowserWindow } from "electron";
import { logger, publicPath } from "../../index.js";

import path from 'path';

export interface Download {
    id: number;
    filename: string,
    totalBytes: number,
    receivedBytes: number,
    item: DownloadItem
}

/**
 * DownloadHandler class
 * @since v2.0.0
 * 
 * Handles downloads, typically triggered in tabs.
 */
export default class DownloadHandler {
    /**
     * Creates a new DownloadHandler for an specific download.
     * Once a DownloadHandler is constructed, it automatically
     * starts handling it. This creates a window where the progress
     * is shown to the user, and other things.
     * 
     * @param {DownloadItem} item The item being downloaded.
     */
    constructor(item: DownloadItem, tab: BrowserWindow) {
        logger.logMessage(`Download triggered.`);

        let downloadModal = new BrowserWindow({
            title: 'Downloading...',
            parent: tab,
            modal: true,
            resizable: false,
            height: 180,
            width: 280
        });
        downloadModal.loadFile(path.join(publicPath, "download.html"));

        logger.logMessage(`Spawned download modal.`);

        item.on('updated', (_event, state) => {
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

        item.once('done', (_event, state) => {
            if (state == 'completed') {
                logger.logMessage(`Download completed succesfully.`);
            } else {
                logger.logWarning(`Download failed: ${state}`);
            }
        });
    }
}

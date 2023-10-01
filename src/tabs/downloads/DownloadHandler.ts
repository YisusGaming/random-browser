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
     * 
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
            height: 440,
            width: 480,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        downloadModal.loadFile(path.join(publicPath, "download.html"));
        downloadModal.webContents.send('title-update', `${item.getFilename()}...`);

        logger.logMessage(`Spawned download modal.`);

        item.on('updated', (_event, state) => {
            if (state == 'interrupted') {
                downloadModal.webContents.send('status-update', 'Status: Interrupted.');
            } else if (state == 'progressing') {
                if (item.isPaused()) {
                    downloadModal.webContents.send('status-update', 'Status: Paused.');
                } else {
                    downloadModal.webContents.send('status-update', 'Status: Downloading.');
                    downloadModal.webContents.send('progress-update',
                        `${Math.round((item.getReceivedBytes() / item.getTotalBytes()) * 100)}%`,
                        `${item.getReceivedBytes()} bytes out of ${item.getTotalBytes()} bytes.`
                    );
                }
            }
        });

        item.once('done', (_event, state) => {
            if (state == 'completed') {
                logger.logMessage(`Download completed succesfully.`);
                downloadModal.webContents.send('status-update', 'Status: Completed.');
            } else {
                downloadModal.webContents.send('status-update', `Status: Failed, ${state}.`);
                logger.logWarning(`Download failed: ${state}`);
            }
        });
    }
}

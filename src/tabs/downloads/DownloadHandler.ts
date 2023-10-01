import { DownloadItem, BrowserWindow, dialog } from "electron";
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

        tab.on('close', () => {
            item.cancel();
        });

        let downloadModal = new BrowserWindow({
            title: 'Downloading...',
            parent: tab,
            resizable: false,
            height: 300,
            width: 400,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        downloadModal.on('close', () => {item.cancel(); return;});
        downloadModal.loadFile(path.join(publicPath, "download.html"));

        logger.logMessage(`Spawned download window.`);

        downloadModal.webContents.ipc.on('download-resume', () => {
            if (item.canResume()) {
                item.resume();
                return;
            }

            dialog.showErrorBox("Can't resume", "Download can't be resumed.");
        });

        downloadModal.webContents.ipc.on('download-pause', () => {
            item.pause();
        });

        downloadModal.webContents.ipc.on('download-cancel', () => {
            item.cancel();
        });

        item.on('updated', (_event, state) => {
            downloadModal.webContents.send('title-update', `${item.getFilename()}...`);
            if (state == 'interrupted') {
                downloadModal.webContents.send('status-update', 'Status: Interrupted.');
            } else if (state == 'progressing') {
                if (item.isPaused()) {
                    downloadModal.webContents.send('status-update', 'Status: Paused.');
                } else {
                    downloadModal.webContents.send('status-update', 'Status: Downloading.');
                    downloadModal.webContents.send('progress-update',
                        `Progress: ${Math.round((item.getReceivedBytes() / item.getTotalBytes()) * 100)}%`,
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

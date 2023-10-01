const { ipcRenderer } = require('electron');

const title = document.getElementById('download-title');
const status = document.getElementById('download-status');
const progress = document.getElementById('download-progress');
const progressBytes = document.getElementById('download-bytes');

/* Updates */
ipcRenderer.on('title-update', (_event, newTitle) => {
    title.innerText = newTitle;
});

ipcRenderer.on('status-update', (_event, newStatus) => {
    status.innerText = newStatus;
});

ipcRenderer.on('progress-update', (_event, newProgress, newByteProgress) => {
    progress.innerText = newProgress;
    progressBytes.innerText = newByteProgress;
});

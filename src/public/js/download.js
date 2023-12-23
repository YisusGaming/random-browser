const { ipcRenderer } = require('electron');

const title = document.getElementById('download-title');
const status = document.getElementById('download-status');
const progress = document.getElementById('download-progress');
const progressBytes = document.getElementById('download-bytes');

/** @type {HTMLButtonElement} */
const resumeBtn = document.getElementById('btn-resume');
/** @type {HTMLButtonElement} */
const pauseBtn = document.getElementById('btn-pause');
/** @type {HTMLButtonElement} */
const cancelBtn = document.getElementById('btn-cancel');

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

resumeBtn.addEventListener('click', () => {
    if (resumeBtn.disabled) return;

    ipcRenderer.send('download-resume');
    resumeBtn.disabled = true;
    pauseBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    if (pauseBtn.disabled) return;

    ipcRenderer.send('download-pause');
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
});

cancelBtn.addEventListener('click', () => {
    if (cancelBtn.disabled) return;

    ipcRenderer.send('download-cancel');
    resumeBtn.disabled = true;
    pauseBtn.disabled = true;
});

const { ipcRenderer } = require('electron');

document.getElementById('background-load-btn').addEventListener('click', () => {
    ipcRenderer.send('minimize-apploader');
});
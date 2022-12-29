const { ipcRenderer } = require('electron');

/* Form Selection */
document.getElementById('background').addEventListener('change', (event) => {
    document.getElementById('selected-image').src = document.getElementById('background').files[0].path;
});

/* Set Background Image */
document.getElementById('change-background').addEventListener('submit', (event) => {
    event.preventDefault();
    /** @type {string} */
    const filePath = document.getElementById('background').files[0].path;

    ipcRenderer.send('set-background', filePath);
});

/* Clear Background Image */
document.getElementById('clear-bg').addEventListener('click', (event) => {
    ipcRenderer.send('clear-background');
});
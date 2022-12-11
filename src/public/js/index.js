const { ipcRenderer } = require('electron');

/* Search Form */
document.querySelector('.search-bar').addEventListener('submit', (event) => {
    event.preventDefault();

    /** @type {HTMLInputElement} */
    const search = document.getElementById('search');
    ipcRenderer.send('new-search', search.value);
    search.value = '';
});

/* Version Request */
ipcRenderer.send('req-version');

ipcRenderer.on('app-version', (event, version) => {
    document.getElementById('browser-version').innerText = `Random Browser ${version}`;
});
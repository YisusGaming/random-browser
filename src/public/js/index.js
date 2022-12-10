const { ipcRenderer } = require('electron');

/* Search Form */
document.querySelector('.search-bar').addEventListener('submit', (event) => {
    event.preventDefault();

    /** @type {HTMLInputElement} */
    const search = document.getElementById('search');
    ipcRenderer.send('new-search', search.value);
    search.value = '';
});
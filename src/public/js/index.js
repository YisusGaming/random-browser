const { ipcRenderer } = require('electron');

/* Window Frame */
// Minimzize button
document.getElementById('minimize').addEventListener('click', () => {
    ipcRenderer.send('minimize-main');
});
// Maximize button
document.getElementById('maximize').addEventListener('click', () => {
    ipcRenderer.send('maximize-main');
});
// Close button
document.getElementById('close').addEventListener('click', () => {
    ipcRenderer.send('close-main');
});

/* Configs */
ipcRenderer.on('update-background', (event, file) => {
    console.log(`Updating background image to ${file}`);
    updateBackground(file);
});

/* Learn Page */
document.getElementById('about-btn').addEventListener('click', (event) => {
    ipcRenderer.send('new-search', 'https://yisusgaming.github.io/random-browser');
});

/* Browser Background */
document.getElementById('background-btn').addEventListener('click', (event) => {
    ipcRenderer.send('new-background-image');
});

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
    document.getElementById('browser-version').innerHTML = `Random Browser ${version} <i class="fa-solid fa-circle-check"></i>`;
});

/**
 * @param {string} file
 */
function updateBackground(file) {
    const parsedUrl = new URL(file);
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundImage = `url('${parsedUrl.toString()}')`;
}
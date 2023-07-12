const { ipcRenderer } = require('electron');
const tabsContainer = document.getElementById('tabs-container');

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

/* Tabs */
ipcRenderer.on('tab-builded', (event, tabId) => {
    /** @type {NodeListOf<HTMLParagraphElement} */
    let prevTabs = document.querySelectorAll(".tab-title");
    for (let i = 0; i < prevTabs.length; i++) {
        if (prevTabs[i].dataset.tabId == tabId) {
            return;
        }
    }
    
    const tabTemplate = `
        <div class="tab">
            <p class="tab-title" data-tab-id="${tabId}">Tab ${tabId + 1}</p>
            <button data-tab-id="${tabId}" class="delete-tab-btn" title="Delete Tab">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>`;
    tabsContainer.innerHTML += tabTemplate;
    document.querySelectorAll('.delete-tab-btn').forEach(( /** @type {HTMLButtonElement} */ btn) => {
        btn.onclick = () => {
            btn.parentElement.remove();
            ipcRenderer.send('tab-deleted', Number(btn.dataset.tabId));
        }
    });
    document.querySelectorAll(".tab-title").forEach(( /** @type {HTMLParagraphElement} */ title) => {
        title.onclick = () => {
            ipcRenderer.send('open-tab', Number(title.dataset.tabId));
        };
    });
});

/* Configs */
ipcRenderer.on('update-background', (event, file) => {
    console.log(`Updating background image to ${file}`);
    updateBackground(file);
});

/* Downloads Menu */
document.getElementById('downloads-btn').addEventListener('mouseover', (event) => {
    alert('download menu');
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
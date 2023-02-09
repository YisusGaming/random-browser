import { BrowserWindow } from 'electron';

/**
 * The BrowserTab class.
 * This class shouldn't be instanced directly. Use `TabManager.createTab` instead.
 */
export default class BrowserTab {
    private url: string;
    private parent: BrowserWindow;

    /**
     * @param url The URL the tab is pointing to.
     * @param parent The parent of this modal. It should be the main browser's window.
     */
    constructor(url: string, parent: BrowserWindow) {
        this.url = url;
        this.parent = parent;
    }

    /**
     * Builds, shows and returns the tab modal.
     */
    public build(): BrowserWindow {
        let tabModal = new BrowserWindow({
            title: `Searching ${this.url}...`,
            parent: this.parent,
            modal: true,
            frame: false,
            width: this.parent.getSize()[0],
            height: this.parent.getSize()[1],
            x: this.parent.getBounds().x,
            y: this.parent.getBounds().y,
            resizable: false,
        });

        // Center the tab modal if the main window is maximized to make sure it fills all the screen.
        if (this.parent.isMaximized()) {
            tabModal.setBounds({
                x: 0,
                y: 0,
            });
        }
        tabModal.loadURL(this.url);

        return tabModal;
    }
}

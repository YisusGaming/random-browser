import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

/**
 * The BrowserTab class.
 * This class shouldn't be instanced directly. Use `TabManager.createTab` instead.
 */
export default class BrowserTab {
    private url: string;
    private parent: BrowserWindow;
    private tabId: number;

    /**
     * @param url The URL the tab is pointing to.
     * @param parent The parent of this modal. It should be the main browser's window.
     * @param tabId A zero-based id that identifies this tab. Provided automatically if the tab instance was created with `TabManager.createTab`.
     */
    constructor(url: string, parent: BrowserWindow, tabId: number) {
        this.url = url;
        this.parent = parent;
        this.tabId = tabId;
    }

    private tabMenu(): Menu {
        let template: MenuItemConstructorOptions[] = [
            {
                type: 'separator'
            },
            {
                label: 'Page Actions',
                submenu: [
                    {
                        role: 'copy'
                    },
                    {
                        role: 'cut'
                    },
                    {
                        role: 'paste'
                    },
                    {
                        role: 'undo'
                    },
                    {
                        role: 'redo'
                    },
                    {
                        label: 'Inspect',
                        role: 'toggleDevTools'
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                label: `Tab ${this.tabId + 1} Controls`,
                submenu: [
                    {
                        label: 'Close Tab',
                        role: 'close'
                    },
                    {
                        label: 'Zoom',
                        submenu: [
                            {
                                role: 'zoomIn'
                            },
                            {
                                role: 'zoomOut'
                            },
                            {
                                role: 'resetZoom'
                            }
                        ]
                    }
                ]
            }
        ];

        return Menu.buildFromTemplate(template);
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

        tabModal.webContents.addListener('context-menu', () => {
            this.tabMenu().popup({
                window: tabModal
            });
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

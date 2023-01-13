export default class BrowserTab {
    #url : string;
    constructor(url: string) {
        this.#url = url;
    }

    initTab() {
        fetch(this.#url)
            .then((res) => res.text())
            .then((res) => console.log(res))
            .catch((err) => {
                console.error(`${err}`);
            });
    }
}
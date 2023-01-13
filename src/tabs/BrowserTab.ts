export default class BrowserTab {
    #HTML : string;
    #url : string;
    #id : number;
    constructor(url: string, id: number) {
        this.#url = url;
        this.#id = id
        this.#HTML = `<div class="tab" id="tab-${id}">Tab ${id + 1}</div>`;
    }

    build() {
        console.log(`[OK] build for tab ${this.#id}:${this.#url}`);
        return this.#HTML;
    }
}
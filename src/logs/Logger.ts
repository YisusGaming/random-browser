export default class Logger {
    private browserVersion: string;

    /**
     * The logger class.
     *
     * Use this print messages to stdout and stderr.
     * @param browserVersion Random Browser's current version allocated in app.json
     */
    constructor(browserVersion: string) {
        this.browserVersion = browserVersion;
    }

    logMessage(msg: string): void {
        console.log(`[LOG:${this.browserVersion}] => ${msg}`);
    }

    logWarning(warn: string): void {
        console.warn(`[WARNING!] => ${warn} | ${this.browserVersion}`);
    }

    logError(err: string | Error, origin: { file: string; line: number }): void {
        if (typeof err == 'string') {
            console.error(
                `[ERR!] => ${err} | ${this.browserVersion} [${origin.file}:${origin.line}]`
            );
        } else {
            console.error(
                `[ERR!] => ${err.name}: ${err.message} | ${this.browserVersion} [${origin.file}:${origin.line}]`
            );
        }
    }
}

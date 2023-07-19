/**
 * The logger class.
 * @since v2.0.0
 * 
 * Prints messages to `stdout` and `stderr`.
 */
export default class Logger {
    private browserVersion: string;

    /**
     * @param browserVersion Random Browser's current version allocated in `app.json`
     */
    constructor(browserVersion: string) {
        this.browserVersion = browserVersion;
    }

    /**
     * Prints a message to the `stdout`.
     */
    logMessage(msg: string): void {
        console.log(`[LOG:${this.browserVersion}] => ${msg}`);
    }

    /**
     * Prints a message to the `stdout` with a label
     * saying it should be removed before the app
     * gets to production.
     */
    tempLogMessage(msg: string): void {
        console.log(`The following log is temporal and should be removed before production.\n[TEMPORAL LOG:${this.browserVersion}] => ${msg}`);
    }

    /**
     * Prints a warning to the `stderr`.
     */
    logWarning(warn: string): void {
        console.warn(`[WARNING!] => ${warn} | ${this.browserVersion}`);
    }

    /**
     * Prints an `string` or an `Error` to `stderr`.
     */
    logError(err: string | Error, origin: { file: string }): void {
        if (typeof err == 'string') {
            console.error(
                `[ERR!] => ${err} | ${this.browserVersion} [${origin.file}]`
            );
        } else {
            console.error(
                `[ERR!] => ${err.name}: ${err.message} | ${this.browserVersion} [${origin.file}]`
            );
        }
    }
}

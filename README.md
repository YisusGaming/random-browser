<div align="center" style="display:flex;flex-direction:column;">
    <h1>Random Browser</h1>

    An experiment that works like a browser, built using Electron.js and the power of google's search engine.
</div>

## Installation
There's two methods to install Random Browser.
First one is to download it from the latest release, and the other one is by following the [development setup](#development-setup) guide.

## Development setup

**NOTE: If you're planning to contribute, please follow the [contributing setup](#contributing-setup)**.

**First**, you have to `git clone` this repository.
```bash
git clone https://github.com/YisusGaming/random-browser.git
```

Once you've done that, navigate to the folder and install all dependencies with yarn (this project is configured with yarn, it may work with npm as well):

```bash
yarn
```

Once everything is installed, build the typescript code:
```bash
yarn build
```
**NOTE: typescript is not listed as a dependency in package.json. It should be installed globally on your computer, if not, you can install it globally or in the cloned repository.**

And **you're done**! Now run:
```bash
yarn start
```
to run the project.

Scripts in **package.json**:
```json
"scripts": {
    "start": "cp -r ./src/public ./build && electron build/index.js",
    "build": "tsc",
    "start:dev": "nodemon build/index.js",
    "build:dev": "tsc -w"
}
```

## Contributing setup
Sorry, this setup is not documented yet and neither is the project's code. It should be ready soon!

# License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Random Browser</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">YisusGaming</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

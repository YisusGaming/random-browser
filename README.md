# DEV NOTE:

Hey! It's been a long while since I last updated Random Browser. It's currently December 23th 2023, v2.0.0 is finally out, or at least, it'll be soon.

Since the first line of code, Random Browser was just an experiment and I didn't even plan to update it...

But here we are, Random Browser's last release is out.

This version of Random Browser won't receive new features, just small bug fixes (if any).

Note how I said "this version", though. I've been planning to migrate the entire projet to a different framework or programming language.

We'll see...

<div align="center" style="display:flex;flex-direction:column;">
    <h1>Random Browser</h1>

    An experiment that works like a browser, built using Electron.js and the power of google's search engine.
</div>

[![Build Test](https://github.com/YisusGaming/random-browser/actions/workflows/integrate.yml/badge.svg?branch=main)](https://github.com/YisusGaming/random-browser/actions/workflows/integrate.yml)

| Contents | Link |
|--------|------|
|Installation|[Go](#installation)|
|Development setup |[Go](#development-setup)|
|Manual installation|[Go](#manual-installation)|
|Contributing setup|[Go](#contributing-setup)|
|License|[Go](#license)

## Installation
There's two installation methods you can use. 

**The first** one is to download the **latest release** from the [releases page](https://github.com/YisusGaming/random-browser/releases).

**The other method** is by following the [manual installation](#manual-installation) guide.

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

## Manual Installation

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

Now, you have to run the project from the command line before packaging, just run:

```bash
yarn start
```

When you do that, the public folder (where all resources for views are) will be copied to the build folder and the browser will start.

> If something goes wrong, you can copy the folder manually. Just copy **./src/public/** to **./build/**

Once this is done and the browser's window is open, you can close the browser and finally package the app:

For Windows:
```bash
yarn pack-win
```

For Linux **x64**:
```
yarn pack-linux
```

For Mac **x64**:
```bash
yarn pack-mac
```

When that's finished, you should see a folder named **dist**, inside of it you can find executable.

## Contributing setup
> **<!>** Currently the project's code is not so well documented as I'd like. I'll be working on documenting everything better so contributors can more easily understand what the code is doing. If you'd like to contribute, I'm glad having your help on this project, just know that it may be a little confusing for now.

<!-- TODO: Create the contributing file -->
Before you can get to contributing, please read the `contributing` file.

# License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Random Browser</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">YisusGaming</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

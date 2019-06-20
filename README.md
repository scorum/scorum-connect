[![CircleCI](https://circleci.com/gh/scorum/scorum-connect.svg?style=svg)](https://circleci.com/gh/scorum/scorum-connect)

# Scorum Connect 📡
> Browser extension - Show your scorum accounts and store private keys for future transactions from 3rd party applications

> Work In Progress...

## Getting Started
##### Clone repo
```zsh
$ git clone https://github.com/scorum/scorum-connect
```
##### Install dependencies
```zsh
$ yarn 
```
##### Run development watchers (depending on what you need):
```zsh
$ yarn background:watch
$ yarn content:watch
$ yarn popup:watch
```
##### Build (depending on what you need):
```zsh
$ yarn background:build
$ yarn content:build
$ yarn popup:build
$ yarn options:build
```
##### Build all parts
```zsh
$ yarn all:build
```

#### ALSO...
##### Run linting
```zsh
$ yarn lint
```

## Features:

* [`preact`][preact] - Dom manipulation + components
* [`redux-zero`][redux-zero] - State management
* [`parcel`][parcel] - Configuration bundler
* [`lodash`][lodash] - JS utility library
* [`webext-options-sync`][webext-options-sync] - manage and autosave extension's options
* [`chrome-webstore-upload-cli`][chrome-webstore-upload-cli] - Upload the extension to the Chrome Web Store via cli (or on Travis, automatically).
* [`web-ext-submit`][web-ext-submit] - Wrapper around Mozilla’s web-ext to submit extensions to AMO.



## Environment variables

Rename (or copy and rename) .env.default into .env
```
cp .env.default .env
```

## Examples
* Sign transactions received from 3rd party applications - `example` folder

## Todo...

There're some features (updates) which will be included in this starter in the near future:

* [ ] Automate deployment to Chrome Web Store
* [ ] Add logs (via loglevel or via something else)
* [ ] Refactor scss code! (rename classes. use unified model)
* [ ] Add Sentry
* [ ] Add support offline mode (via PWA)
* [ ] Add store synchronization between content, popup and background processes
* [ ] Typescript `?`

[preact]: https://github.com/developit/preact
[redux-zero]: https://github.com/redux-zero/redux-zero
[parcel]: https://github.com/parcel-bundler/parcel
[lodash]: https://github.com/lodash/lodash
[webext-options-sync]: https://github.com/bfred-it/webext-options-sync
[chrome-webstore-upload-cli]: https://github.com/DrewML/chrome-webstore-upload-cli
[web-ext-submit]: https://github.com/bfred-it/web-ext-submit

## License
MIT.

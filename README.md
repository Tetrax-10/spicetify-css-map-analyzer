# Spicetify css-map Analyzer

Analyzes Spicetify's css-map.json and prints mapped, unmapped classes for current Spotify version

<br />

### Getting Started (installation) :

-   Clone this repository `git clone https://github.com/Tetrax-10/spicetify-css-map-analyzer`
-   Make sure [NodeJS](https://nodejs.org/) is installed
-   Run `npm install` to install dependencies
-   Make sure you have latest Spotify installed
-   Also make sure you installed latest commit version of [Spicetify](https://github.com/spicetify/spicetify-cli) (Spicetify should be vDev)
-   Done !

<br />

### Usage :

Run this command to analyze and print unmapped classes

```sh
npm start
```

Run help command to see available options

```sh
npm run analyzer -- --help
```

Run custom combination commands like this `npm run analyzer -- [args]`

```sh
npm run analyzer -- --mapped --sort --out
```

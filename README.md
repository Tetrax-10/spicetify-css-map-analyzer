# Spicetify css-map Analyzer

Analyzes Spicetify's css-map.json and prints mapped, unmapped classes for current Spotify version

<br />

## Getting Started (installation) :

-   Clone this repository `git clone https://github.com/Tetrax-10/spicetify-css-map-analyzer`
-   Make sure [NodeJS](https://nodejs.org/) is installed
-   Run `npm install` to install dependencies
-   Make sure you have latest Spotify installed
-   Also make sure you installed latest commit version of [Spicetify](https://github.com/spicetify/spicetify-cli) (Spicetify should be vDev)
-   Done !

<details>
  <summary>How to analyze older Spotify versions</summary>

<br />

If you want to analyze older versions of Spotify, then install the appropriate version of Spicetify for the version of Spotify you want to analyze. To know the appropriate Spicetify version just skim through the Spicetify [releases](https://github.com/spicetify/spicetify-cli/releases) section.

**Eg** : To analyze `Spotify 1.2.7.1277.g2b3ce637` you should install Spicetify [v2.16.2](https://github.com/spicetify/spicetify-cli/releases/tag/v2.16.2)

![analyze 1.2.7](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/analyze-older-version.png)

### How to install older Spiceify versions?

-   Just clone `spicetify-cli` repo by `git clone https://github.com/spicetify/spicetify-cli`
-   Choose the version you wanna install with `VScode branches`
-   then run `go build -o spicetify.exe` to build Spicetify

![install older spicetify versions](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/install-older-spicetify-versions.png)

</details>

<br />

## Usage :

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

<br />

## Outputs :

### Analyzed report

![analyzed result](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/analyzed-result.png)

### Generated output files

![analyzed result](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/generate-output-files.png)

### Eg: Unmapped classes file

![analyzed result](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/unmapped-file.png)

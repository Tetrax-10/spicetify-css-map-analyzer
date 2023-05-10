# Spicetify css-map Analyzer

Analyzes Spicetify's css-map.json and prints mapped, unmapped classes for current Spotify version

<br />

## Getting Started (installation) :

-   Clone this repository `git clone https://github.com/Tetrax-10/spicetify-css-map-analyzer`
-   Make sure [NodeJS](https://nodejs.org/) is installed
-   Run `npm install` to install dependencies
-   Make sure you have latest Spotify installed
-   Also make sure you installed latest commit version of [Spicetify](https://github.com/spicetify/spicetify-cli)
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

To analyze and print unmapped classes in `css-map.json` for currently installed Spotify and Spicetify versions

```sh
npm run analyze-unmapped-css
```

To analyze and print mapped classes in `css-map.json` for currently installed Spotify and Spicetify versions

```sh
npm run analyze-mapped-css
```

To analyze and print all classes in `css-map.json` for currently installed Spotify and Spicetify versions

```sh
npm run analyze-css-map
```

<br />

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

Lists the `mapped/unmapped/all` classes according to the command you ran. Also tells how much percent of `css-map.json` got mapped for currently installed Spotify and Spicetify version.

![analyzed result](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/analyzed-result.png)

### Generated output files

These output files contains `mapped/unmapped/all` classes.

![output files](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/generate-output-files.png)

These files are useful for comparing what got unmapped when comparing them with other versions of Spotify.

**Eg: Comparing Spotify `1.2.10.760.g52970952` and `1.2.11.914.gd3175972`**

![compare output files](https://raw.githubusercontent.com/Tetrax-10/spicetify-css-map-analyzer/main/assets/compare-output-files.png)

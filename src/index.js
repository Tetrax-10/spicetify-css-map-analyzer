import chalk from "chalk"
import { program } from "commander"

import Shared from "./shared/shared.js"
import Args from "./utils/args.js"
import Path from "./utils/path.js"
import Shell from "./utils/shell.js"
import Remapper from "./remapper/remapper.js"
import Extractor from "./extractor/extractor.js"

program
    .option("-u, --unmapped", "Prints only unmapped classes")
    .option("-m, --mapped", "Prints only mapped classes")
    .option("-s, --sort", "Prints in sorted order")
    .option("-o, --out", "Stores the output classes in a file")
    .option("-e, --extract", "Extracts Spotify's CSS")
    .option("-r, --remap", "Remaps css-map.json by comparing previous Spotify's CSS")
    .parse(process.argv)

// main function
;(async () => {
    Shared.args = program.opts()

    if (!Args.isValid()) return

    if (Shared.args.remap) {
        Remapper.remap()
    } else {
        console.log(chalk.green("Backing up Spotify...\n"))
        await Shell.waitForCommandToFinish("spicetify backup apply -q")

        await Path.load()

        Extractor.extractSpotifyData()

        if (Shared.args.extract) {
            Extractor.extractRemapData()
        }
    }

    console.log(chalk.yellow("Done"))
})()

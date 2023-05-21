import chalk from "chalk"
import { program } from "commander"

import Shared from "./shared/shared.js"
import Shell from "./utils/shell.js"
import Path from "./utils/path.js"
import Analyzer from "./analyzer/analyzer.js"

program
    .option("-u, --unmapped", "Prints unmapped classes")
    .option("-m, --mapped", "Prints mapped classes")
    .option("-t, --theme", "Prints mappable classes that are found in ")
    .option("-s, --sort", "Prints in sorted order")
    .option("-o, --out", "Saves the output data in /out folder")
    .parse(process.argv)

// display help and exit if no arguments provided
if (process.argv.length <= 2) {
    program.help()
}

// main function
;(async () => {
    Shared.args = program.opts()

    console.log(chalk.green("Backing up Spotify...\n"))
    await Shell.execute("spicetify backup apply -q")

    await Path.load()

    Analyzer.analyze()

    console.log(chalk.yellow("Done"))
})()

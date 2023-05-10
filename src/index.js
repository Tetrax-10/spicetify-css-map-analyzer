import chalk from "chalk"
import { program } from "commander"

import Shared from "./shared/shared.js"
import Args from "./utils/args.js"
import Shell from "./utils/shell.js"
import Path from "./utils/path.js"
import Analyzer from "./analyzer/analyzer.js"

program
    .option("-u, --unmapped", "Prints only unmapped classes")
    .option("-m, --mapped", "Prints only mapped classes")
    .option("-s, --sort", "Prints in sorted order")
    .option("-o, --out", "Stores the output classes in a file")
    .parse(process.argv)

// main function
;(async () => {
    Shared.args = program.opts()

    if (!Args.isValid()) return

    console.log(chalk.green("Backing up Spotify...\n"))
    await Shell.waitForCommandToFinish("spicetify backup apply -q")

    await Path.load()

    Analyzer.analyze()

    console.log(chalk.yellow("Done"))
})()

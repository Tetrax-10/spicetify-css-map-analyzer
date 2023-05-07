import chalk from "chalk"
import { program } from "commander"

import Glob from "./utils/glob.js"
import Shell from "./utils/shell.js"
import Shared from "./shared/shared.js"
import Utils from "./utils/utils.js"
import Logger from "./utils/logger.js"

program
    .option("-u, --unmapped", "Prints only unmapped classes")
    .option("-m, --mapped", "Prints only mapped classes")
    .option("-s, --sort", "Prints in sorted order")
    .option("-o, --out", "Stores the output classes in a file")
    .parse(process.argv)

// main function
;(async () => {
    Shared.args = program.opts()

    if (Shared.args.unmapped && Shared.args.mapped) {
        console.log(chalk.red("Can't use --unmapped and --mapped together"))
        return
    }

    console.log(chalk.cyan("Backing up Spotify..."))
    await Shell.waitForCommandToFinish("spicetify backup apply -q")

    await Glob.loadLocalContents()

    Shared.latestCssMap.reversedData = Utils.reverseObject(Shared.originalCssMap.data)
    Shared.latestCssMap.data = Utils.reverseObject(Shared.latestCssMap.reversedData)
    Shared.latestCssMap.classes.all = Shared.args.sort
        ? Object.keys(Shared.latestCssMap.reversedData).sort()
        : Object.keys(Shared.latestCssMap.reversedData)

    Utils.printUnmappedClasses(Shared.xpui.contents, Shared.latestCssMap.classes.all)

    Logger.logOutputToFile()

    Logger.stats()
})()

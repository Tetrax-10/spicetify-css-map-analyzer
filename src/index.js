import chalk from "chalk"
import { program } from "commander"

import Path from "./utils/path.js"
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

    console.log(chalk.cyan("Trying to backup Spotify..."))
    await Shell.waitForCommandToFinish("spicetify backup apply")

    Glob.loadXpuiFolderContents(await Path.get.xpui)

    await Glob.loadLocalCssMap()

    Shared.latestCssMap = Utils.reverseObject(Shared.cssMap)

    Utils.printUnmappedClasses(Shared.folderContents, Object.keys(Shared.latestCssMap))

    Logger.logOutputToFile()

    Logger.stats()
})()

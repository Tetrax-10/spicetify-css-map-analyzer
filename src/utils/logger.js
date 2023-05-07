import fs from "fs"
import chalk, { chalkStderr } from "chalk"

import Shared from "../shared/shared.js"

const Logger = (() => {
    function logOutputToFile() {
        if (!Shared.args.out) return

        if (!fs.existsSync("./out")) {
            fs.mkdirSync("./out")
        }

        if (Shared.args.unmapped) {
            fs.writeFileSync("./out/unmapped.txt", Shared.latestCssMap.classes.unmapped.join("\n"))
        } else if (Shared.args.mapped) {
            fs.writeFileSync("./out/mapped.txt", Shared.latestCssMap.classes.mapped.join("\n"))
        } else {
            fs.writeFileSync("./out/all-classes.txt", Shared.latestCssMap.classes.all.join("\n"))
        }
    }

    function logStats() {
        const totalClasses = Object.keys(Shared.latestCssMap.reversedData).length
        const totalUnmappedClasses = Object.keys(Shared.latestCssMap.classes.unmapped).length
        const totalMappedClasses = Object.keys(Shared.latestCssMap.classes.mapped).length

        console.log()
        console.log(`Total mappable classes : ${totalClasses}`)
        console.log(chalk.red(`Unmapped classes : ${totalUnmappedClasses}`))
        console.log(chalk.green(`Mapped classes : ${totalMappedClasses}`))
        console.log()
        console.log(chalk.yellow(`Mapped ${Math.floor((totalMappedClasses / totalClasses) * 100)}% of mappable classes`))
        console.log()
    }

    return {
        logOutputToFile: logOutputToFile,
        stats: logStats,
    }
})()

export default Logger

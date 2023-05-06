import fs from "fs"
import chalk, { chalkStderr } from "chalk"

import Shared from "../shared/shared.js"

const Logger = (() => {
    function logOutputToFile() {
        if (Shared.args.out || true) {
            if (!fs.existsSync("./out")) {
                fs.mkdirSync("./out")
            }

            if (Shared.args.unmapped) {
                fs.writeFileSync("./out/unmapped.txt", Shared.unMappedClasses.join("\n"))
            } else if (Shared.args.mapped) {
                fs.writeFileSync("./out/mapped.txt", Shared.mappedClasses.join("\n"))
            } else {
                let outputData = Object.keys(Shared.latestCssMap)
                if (Shared.args.sort) {
                    outputData = outputData.sort()
                }
                fs.writeFileSync("./out/all-classes.txt", outputData.join("\n"))
            }
        }
    }

    function logstats() {
        const totalClasses = Object.keys(Shared.latestCssMap).length
        const totalUnmappedClasses = Object.keys(Shared.unMappedClasses).length
        const totalMappedClasses = Object.keys(Shared.mappedClasses).length

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
        stats: logstats,
    }
})()

export default Logger

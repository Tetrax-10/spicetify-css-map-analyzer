import chalk from "chalk"

import Shared from "../shared/shared.js"
import Glob from "../utils/glob.js"
import Utils from "../utils/utils.js"
import AnalyzerUtils from "./analyzerUtils.js"

const Analyzer = (() => {
    function analyze() {
        Glob.loadLocalContents()

        Shared.latestCssMap.reversedData = Utils.reverseObject(Shared.originalCssMap.data)
        Shared.latestCssMap.data = Utils.reverseObject(Shared.latestCssMap.reversedData)
        Shared.latestCssMap.classes.all = Shared.args.sort
            ? Object.keys(Shared.latestCssMap.reversedData).sort()
            : Object.keys(Shared.latestCssMap.reversedData)

        AnalyzerUtils.separateMappedAndUnmappedClasses()

        const totalClasses = Object.keys(Shared.latestCssMap.reversedData).length
        const totalUnmappedClasses = Object.keys(Shared.latestCssMap.classes.unmapped).length
        const totalMappedClasses = Object.keys(Shared.latestCssMap.classes.mapped).length

        if (Shared.args.unmapped || Shared.args.mapped) {
            console.log(`Total mappable classes : ${totalClasses}`)
            console.log(chalk.red(`Unmapped classes : ${totalUnmappedClasses}`))
            console.log(chalk.green(`Mapped classes : ${totalMappedClasses}\n`))
            console.log(
                chalk.yellow(
                    `Spicetify devs have Mapped ${Math.floor((totalMappedClasses / totalClasses) * 100)}% of mappable classes in Spotify ${
                        Shared.spicetifyConfig.Backup.version
                    }\n`
                )
            )
        }

        AnalyzerUtils.logClassesToOutFile()
    }

    return {
        analyze: analyze,
    }
})()

export default Analyzer

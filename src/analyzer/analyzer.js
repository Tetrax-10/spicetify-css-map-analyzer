import chalk from "chalk"

import Shared from "../shared/shared.js"
import Utils from "../utils/utils.js"
import AnalyzerUtils from "./analyzerUtils.js"

const Analyzer = (() => {
    function analyze() {
        AnalyzerUtils.glob.loadLocalContents()

        Shared.latestCssMap.reversedData = Utils.reverseObject(Shared.originalCssMap.data)
        Shared.latestCssMap.data = Utils.reverseObject(Shared.latestCssMap.reversedData)
        Shared.latestCssMap.classes.all = Shared.args.sort
            ? Object.keys(Shared.latestCssMap.reversedData).sort()
            : Object.keys(Shared.latestCssMap.reversedData)

        AnalyzerUtils.separateMappedAndUnmappedClasses()

        const totalClasses = Object.keys(Shared.latestCssMap.reversedData).length - Shared.latestCssMap.classes.deprecated.length
        const totalUnmappedClasses = Object.keys(Shared.latestCssMap.classes.unmapped).length
        const totalMappedClasses = Object.keys(Shared.latestCssMap.classes.mapped).length

        if (Shared.args.unmapped || Shared.args.mapped) {
            console.log(`Total mappable classes : ${totalClasses}`)
            console.log(chalk.red(`Unmapped classes : ${totalUnmappedClasses}`))
            console.log(chalk.green(`Mapped classes : ${totalMappedClasses}`), "\n")
            console.log(
                chalk.yellow(
                    `Spicetify devs have Mapped ${Math.floor((totalMappedClasses / totalClasses) * 100)}% of mappable classes in Spotify ${
                        Shared.spicetifyConfig.Backup.version
                    }`
                ),
                "\n"
            )

            if (Shared.latestCssMap.classes.notDeprecated.reimplementedMayBeDeprecated.length) {
                console.log(
                    `${chalk.red("These classes are not deprecated.")} ${chalk.yellow(
                        `Remove them from ${chalk.blue("may-be-deprecated-css-map.json")}`
                    )}`,
                    "\n"
                )
                console.log(Shared.latestCssMap.classes.notDeprecated.reimplementedMayBeDeprecated, "\n")
            }

            if (Shared.latestCssMap.classes.notDeprecated.reimplemented.length) {
                console.log(
                    `${chalk.red("These classes have been reimplemented.")} ${chalk.yellow(
                        `Remove them from ${chalk.blue("deprecated-css-map.json")}`
                    )}`,
                    "\n"
                )
                console.log(Shared.latestCssMap.classes.notDeprecated.reimplemented, "\n")
            }
        }

        if (Shared.args.theme) {
            AnalyzerUtils.glob.loadThemeCss()

            AnalyzerUtils.analyzeThemesMappableClasses()

            const totalHashClasses = Object.keys(Shared.theme.hashClasses.all).length
            const totalOutdatedHashClasses = Shared.theme.hashClasses.outDated.length
            const totalStillAvailableHashClasses = Shared.theme.hashClasses.stillAvailable.length

            console.log(`Total hash classes found in ${Shared.spicetifyConfig.Setting.current_theme} Theme : ${totalHashClasses}`)
            console.log(
                chalk.red(`Outdated hash classes (not found in Spotify ${Shared.spicetifyConfig.Backup.version}) : ${totalOutdatedHashClasses}`)
            )
            console.log(chalk.green(`Still available hash classes : ${totalStillAvailableHashClasses}`), "\n")

            const totalMappableClasses = Object.keys(Shared.theme.filteredCssMap).length

            if (totalMappableClasses) {
                console.log(
                    chalk.yellow(`Found ${totalMappableClasses} mappable classes in ${Shared.spicetifyConfig.Setting.current_theme} Theme :`),
                    "\n"
                )

                console.log(Shared.theme.filteredCssMap, "\n")
            }

            if (Shared.theme.hashClasses.deprecated.length) {
                console.log(
                    chalk.yellow(`These classes are deprecated. Remove them from ${Shared.spicetifyConfig.Setting.current_theme} Theme`),
                    "\n"
                )
                console.log(chalk.red(Shared.theme.hashClasses.deprecated.join("\n")), "\n")
            }

            if (Shared.theme.hashClasses.maybeDeprecated.length) {
                console.log(
                    chalk.yellow(
                        `These classes might have become deprecated. Think about removing them from ${Shared.spicetifyConfig.Setting.current_theme} Theme`
                    ),
                    "\n"
                )
                console.log(chalk.red(Shared.theme.hashClasses.maybeDeprecated.join("\n")), "\n")
            }
        }

        AnalyzerUtils.logClassesToOutFile()
    }

    return {
        analyze: analyze,
    }
})()

export default Analyzer

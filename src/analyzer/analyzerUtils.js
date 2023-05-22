import chalk from "chalk"

import Shared from "../shared/shared.js"
import AnalyzerGlob from "./analyzerGlob.js"
import Glob from "../utils/glob.js"
import Utils from "../utils/utils.js"

const AnalyzerUtils = (() => {
    function separateMappedAndUnmappedClasses() {
        console.log(chalk.yellow(`Analyzing Spotify ${Shared.spicetifyConfig.Backup.version}'s css with css-map.json...`), "\n")

        if (Shared.args.unmapped && !Shared.args.mapped) {
            console.log(chalk.yellow(`Unmapped classes in Spotify ${Shared.spicetifyConfig.Backup.version}`), "\n")
        } else if (Shared.args.mapped && !Shared.args.unmapped) {
            console.log(chalk.yellow(`Mapped classes in Spotify ${Shared.spicetifyConfig.Backup.version}`), "\n")
        } else if (Shared.args.unmapped && Shared.args.mapped) {
            console.log(chalk.yellow(`All mappable classes in Spotify ${Shared.spicetifyConfig.Backup.version}`), "\n")
        }

        Shared.latestCssMap.classes.all.forEach((mappedClass) => {
            if (Shared.xpui.contents.match(Utils.getAbsoluteRegex(mappedClass)) === null) {
                if (
                    Shared.latestCssMap.classes.deprecated.includes(mappedClass) ||
                    Shared.latestCssMap.classes.maybeDeprecated.includes(mappedClass)
                ) {
                    return
                }

                Shared.latestCssMap.classes.notDeprecated.all.push(mappedClass)
                Shared.latestCssMap.classes.unmapped.push(mappedClass)
                if (Shared.args.unmapped) console.log(chalk.red(mappedClass))
            } else {
                if (Shared.latestCssMap.classes.deprecated.includes(mappedClass)) {
                    Shared.latestCssMap.classes.notDeprecated.reimplemented.push(mappedClass)
                } else if (Shared.latestCssMap.classes.maybeDeprecated.includes(mappedClass)) {
                    Shared.latestCssMap.classes.notDeprecated.reimplementedMayBeDeprecated.push(mappedClass)
                } else {
                    Shared.latestCssMap.classes.notDeprecated.all.push(mappedClass)
                }

                Shared.latestCssMap.classes.mapped.push(mappedClass)
                if (Shared.args.mapped) console.log(chalk.green(mappedClass))
            }
        })

        if (Shared.args.unmapped || Shared.args.mapped) console.log()
    }

    function analyzeThemesMappableClasses() {
        Shared.theme.hashClasses.all = [...new Set(Shared.theme.css.match(Shared.regex.extractHashClass))]

        console.log(chalk.yellow(`Unmapped Hash classes in ${Shared.spicetifyConfig.Setting.current_theme} Theme :`), "\n")

        Shared.theme.hashClasses.all.forEach((hashClass) => {
            if (Shared.originalCssMap.data.hasOwnProperty(hashClass)) {
                Shared.theme.filteredCssMap[hashClass] = Shared.originalCssMap.data[hashClass]
                return
            }

            if (Shared.xpui.contents.indexOf(hashClass) === -1) {
                Shared.theme.hashClasses.outDated.push(hashClass)
                console.log(chalk.red(hashClass))
            } else {
                Shared.theme.hashClasses.stillAvailable.push(hashClass)
                console.log(chalk.green(hashClass))
            }
        })

        Shared.latestCssMap.classes.deprecated.forEach((mappedClass) => {
            // deprecated class found in theme
            if (Shared.theme.css.match(Utils.getAbsoluteRegex(mappedClass)) !== null) {
                Shared.theme.hashClasses.deprecated.push(mappedClass)
            }
        })

        Shared.latestCssMap.classes.maybeDeprecated.forEach((mappedClass) => {
            // maybe deprecated class found in theme
            if (Shared.theme.css.match(Utils.getAbsoluteRegex(mappedClass)) !== null) {
                Shared.theme.hashClasses.maybeDeprecated.push(mappedClass)
            }
        })

        console.log()
    }

    function logClassesToOutFile() {
        if (!Shared.args.out) return

        if (Shared.args.unmapped || Shared.args.mapped || Shared.args.theme) {
            Glob.create.folder("./out")
        }

        if (Shared.args.unmapped) {
            Glob.write.file(`./out/unmapped-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.unmapped.join("\n"))
        }
        if (Shared.args.mapped) {
            Glob.write.file(`./out/mapped-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.mapped.join("\n"))
        }
        if (Shared.args.unmapped && Shared.args.mapped) {
            Glob.write.file(
                `./out/all-classes-${Shared.spicetifyConfig.Backup.version}.txt`,
                Shared.latestCssMap.classes.notDeprecated.all.join("\n")
            )
        }
        if (Shared.args.theme) {
            Glob.write.file(`./out/theme-hash-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.theme.hashClasses.all.join("\n"))
            Glob.write.json(`./out/mappable-theme-hash-classes-${Shared.spicetifyConfig.Backup.version}.json`, Shared.theme.filteredCssMap)
        }
    }

    return {
        separateMappedAndUnmappedClasses: separateMappedAndUnmappedClasses,
        analyzeThemesMappableClasses: analyzeThemesMappableClasses,
        logClassesToOutFile: logClassesToOutFile,
        glob: {
            loadLocalContents: AnalyzerGlob.loadLocalContents,
            loadThemeCss: AnalyzerGlob.loadThemeCss,
        },
    }
})()

export default AnalyzerUtils

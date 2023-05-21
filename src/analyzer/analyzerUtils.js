import fs from "fs"
import chalk from "chalk"

import Shared from "../shared/shared.js"
import AnalyzerGlob from "./analyzerGlob.js"
import Glob from "../utils/glob.js"

const AnalyzerUtils = (() => {
    function separateMappedAndUnmappedClasses() {
        console.log(chalk.yellow(`Analyzing Spotify ${Shared.spicetifyConfig.Backup.version}'s css with css-map.json\n`))

        function getAbsoluteRegex(str) {
            return new RegExp("(?<!\\w|-)" + str + "(?!\\w|-)")
        }

        Shared.latestCssMap.classes.all.forEach((mappedClass) => {
            if (Shared.xpui.contents.match(getAbsoluteRegex(mappedClass)) === null) {
                if (Shared.latestCssMap.classes.deprecated.includes(mappedClass)) return

                Shared.latestCssMap.classes.unmapped.push(mappedClass)
                if (Shared.args.unmapped) console.log(chalk.red(mappedClass))
            } else {
                if (Shared.latestCssMap.classes.deprecated.includes(mappedClass)) {
                    Shared.latestCssMap.classes.reimplemented.push(mappedClass)
                } else if (Shared.latestCssMap.classes.maybeDeprecated.includes(mappedClass)) {
                    Shared.latestCssMap.classes.notDeprecated.push(mappedClass)
                }

                Shared.latestCssMap.classes.mapped.push(mappedClass)
                if (Shared.args.mapped) console.log(chalk.green(mappedClass))
            }
        })

        if (Shared.args.unmapped || Shared.args.mapped) console.log()
    }

    function analyzeThemesMappableClasses() {
        Shared.theme.hashClasses = [...new Set(Shared.theme.css.match(Shared.regex.extractHashClass))]

        Shared.theme.hashClasses.forEach((hashClass) => {
            if (Shared.originalCssMap.data.hasOwnProperty(hashClass)) {
                Shared.theme.filteredCssMap[hashClass] = Shared.originalCssMap.data[hashClass]
            }
        })
    }

    function logClassesToOutFile() {
        if (!Shared.args.out) return

        if (!fs.existsSync("./out")) {
            fs.mkdirSync("./out")
        }

        if (Shared.args.unmapped) {
            fs.writeFileSync(`./out/unmapped-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.unmapped.join("\n"))
        }
        if (Shared.args.mapped) {
            fs.writeFileSync(`./out/mapped-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.mapped.join("\n"))
        }
        if (Shared.args.unmapped && Shared.args.mapped) {
            fs.writeFileSync(`./out/all-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.all.join("\n"))
        }
        if (Shared.args.theme) {
            fs.writeFileSync(`./out/theme-hash-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.theme.hashClasses.join("\n"))
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

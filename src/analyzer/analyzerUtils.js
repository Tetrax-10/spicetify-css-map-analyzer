import fs from "fs"
import chalk from "chalk"

import Shared from "../shared/shared.js"
import AnalyzerGlob from "./analyzerGlob.js"

const AnalyzerUtils = (() => {
    function separateMappedAndUnmappedClasses() {
        console.log(chalk.yellow(`Analyzing Spotify ${Shared.spicetifyConfig.Backup.version}'s css with css-map.json\n`))

        Shared.latestCssMap.classes.all.forEach((mappedClass) => {
            // if -1 then substring is not present in the content
            if (Shared.xpui.contents.indexOf(mappedClass) === -1) {
                Shared.latestCssMap.classes.unmapped.push(mappedClass)
                if (Shared.args.unmapped) console.log(chalk.red(mappedClass))
            } else {
                Shared.latestCssMap.classes.mapped.push(mappedClass)
                if (Shared.args.mapped) console.log(chalk.green(mappedClass))
            }
        })

        if (Shared.args.unmapped || Shared.args.mapped) console.log()
    }

    function logClassesToOutFile() {
        if (!Shared.args.out) return

        if (!fs.existsSync("./out") && (Shared.args.unmapped || Shared.args.mapped)) {
            fs.mkdirSync("./out")
        }

        if (Shared.args.unmapped && !Shared.args.mapped) {
            fs.writeFileSync(`./out/unmapped-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.unmapped.join("\n"))
        } else if (!Shared.args.unmapped && Shared.args.mapped) {
            fs.writeFileSync(`./out/mapped-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.mapped.join("\n"))
        } else if (Shared.args.unmapped && Shared.args.mapped) {
            fs.writeFileSync(`./out/all-classes-${Shared.spicetifyConfig.Backup.version}.txt`, Shared.latestCssMap.classes.all.join("\n"))
        }
    }

    return {
        separateMappedAndUnmappedClasses: separateMappedAndUnmappedClasses,
        logClassesToOutFile: logClassesToOutFile,
        glob: {
            loadLocalContents: AnalyzerGlob.loadLocalContents,
        },
    }
})()

export default AnalyzerUtils

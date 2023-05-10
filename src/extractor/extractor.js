import fs from "fs"
import chalk from "chalk"

import Shared from "../shared/shared.js"
import Glob from "../utils/glob.js"
import Utils from "../utils/utils.js"
import ExtractorUtils from "./extractorUtils.js"

const Extractor = (() => {
    function extractSpotifyData() {
        Glob.loadLocalContents()

        Shared.latestCssMap.reversedData = Utils.reverseObject(Shared.originalCssMap.data)
        Shared.latestCssMap.data = Utils.reverseObject(Shared.latestCssMap.reversedData)
        Shared.latestCssMap.classes.all = Shared.args.sort
            ? Object.keys(Shared.latestCssMap.reversedData).sort()
            : Object.keys(Shared.latestCssMap.reversedData)

        separateMappedAndUnmappedClasses()

        const totalClasses = Object.keys(Shared.latestCssMap.reversedData).length
        const totalUnmappedClasses = Object.keys(Shared.latestCssMap.classes.unmapped).length
        const totalMappedClasses = Object.keys(Shared.latestCssMap.classes.mapped).length

        if (Shared.args.unmapped || Shared.args.mapped) {
            console.log(`Total mappable classes : ${totalClasses}`)
            console.log(chalk.red(`Unmapped classes : ${totalUnmappedClasses}`))
            console.log(chalk.green(`Mapped classes : ${totalMappedClasses}\n`))
            console.log(chalk.yellow(`Spicetify devs have Mapped ${Math.floor((totalMappedClasses / totalClasses) * 100)}% of mappable classes\n`))
        }

        logClassesToOutFile()
    }

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
        extractSpotifyData: extractSpotifyData,
        extractRemapData: ExtractorUtils.extractRemapData,
    }
})()

export default Extractor

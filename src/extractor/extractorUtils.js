import chalk from "chalk"
import fs from "fs"
import Shared from "../shared/shared.js"

const ExtractorUtils = (() => {
    function extractRemapData() {
        console.log(chalk.green("Extracting Remap Data...\n"))

        if (!fs.existsSync("./remap-data")) {
            fs.mkdirSync("./remap-data")
        }
        console.log(Shared.spicetifyConfig.Backup.version)
        fs.writeFileSync(`./remap-data/${Shared.spicetifyConfig.Backup.version}.css`, Shared.xpui.cssContents)
    }

    return {
        extractRemapData: extractRemapData,
    }
})()

export default ExtractorUtils

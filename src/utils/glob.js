import fs from "fs"
import path from "path"
import chalk from "chalk"

import Shared from "../shared/shared.js"

const Glob = (() => {
    function getFileContents(filePath) {
        return fs.readFileSync(filePath, "utf-8")
    }

    function loadXpuiFolderContents() {
        console.log(chalk.blue("Reading Spotify files..."))

        fs.readdirSync(Shared.path.xpuiPath).forEach((file) => {
            const filePath = path.join(Shared.path.xpuiPath, file)
            const fileExtension = path.extname(file)

            if (
                fs.statSync(filePath).isFile() &&
                (fileExtension === ".js" || fileExtension === ".css") &&
                !file.includes("spicetify") &&
                file !== "user.css" &&
                file !== "colors.css"
            ) {
                const fileContents = getFileContents(filePath)

                if (fileExtension === ".css") {
                    Shared.xpui.cssContents += fileContents + "\n"
                } else {
                    Shared.xpui.jsContents += fileContents + "\n"
                }
            }
        })

        Shared.xpui.contents = Shared.xpui.cssContents + Shared.xpui.jsContents
    }

    function loadLocalCssMap() {
        console.log(chalk.blue("Reading css-map.json..."))

        const rawCssMapContent = getFileContents(Shared.path.cssMap)
        Shared.originalCssMap.data = JSON.parse(rawCssMapContent)
    }

    function loadLocalContents() {
        // loads xpui contents
        loadXpuiFolderContents()
        // loads local css-map contents
        loadLocalCssMap()

        console.log()
    }

    return {
        loadLocalContents: loadLocalContents,
    }
})()

export default Glob

import fs from "fs"
import path from "path"
import chalk from "chalk"

import Shared from "../shared/shared.js"
import Path from "./path.js"

const Glob = (() => {
    function getFileContents(filePath) {
        return fs.readFileSync(filePath, "utf-8")
    }

    function loadXpuiFolderContents(folderPath) {
        console.log(chalk.cyan("Reading Spotify files..."))

        fs.readdirSync(folderPath).forEach((file) => {
            const filePath = path.join(folderPath, file)
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

    async function loadLocalCssMap() {
        console.log(chalk.cyan("Reading css-map.json"))

        const rawCssMapContent = getFileContents(await Path.get.cssMap)
        Shared.originalCssMap.data = JSON.parse(rawCssMapContent)
    }

    async function loadLocalContents() {
        // loads xpui contents
        loadXpuiFolderContents(await Path.get.xpui)
        // loads local css-map contents
        loadLocalCssMap()
    }

    return {
        loadLocalContents: loadLocalContents,
    }
})()

export default Glob

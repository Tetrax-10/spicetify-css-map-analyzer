import fs from "fs"
import path from "path"
import chalk from "chalk"

import Shared from "../shared/shared.js"
import Glob from "../utils/glob.js"

const AnalyzerGlob = (() => {
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
                const fileContents = Glob.get.fileContents(filePath)

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

        const rawCssMapContent = Glob.get.fileContents(Shared.path.cssMap)
        Shared.originalCssMap.data = JSON.parse(rawCssMapContent)
    }

    function loadDeprecatedCssMap() {
        Shared.latestCssMap.classes.deprecated = Glob.get.json("./src/public/deprecated-css-map.json")
        Shared.latestCssMap.classes.maybeDeprecated = Glob.get.json("./src/public/may-be-deprecated-css-map.json")
    }

    function loadLocalContents() {
        // loads xpui contents
        loadXpuiFolderContents()
        // loads local css-map contents
        loadLocalCssMap()

        loadDeprecatedCssMap()

        console.log()
    }

    function loadThemeCss() {
        console.log(chalk.blue("Reading Theme's CSS..."), "\n")

        const themeCssContent = Glob.get.fileContents(
            path.join(Shared.path.spicetifyUserDataPath, "Themes", Shared.spicetifyConfig.Setting.current_theme, "user.css")
        )

        Shared.theme.css = themeCssContent
    }

    return {
        loadLocalContents: loadLocalContents,
        loadThemeCss: loadThemeCss,
    }
})()

export default AnalyzerGlob

import path from "path"
import fs from "fs"
import ini from "ini"

import Shared from "../shared/shared.js"
import Shell from "./shell.js"

const Path = (() => {
    async function loadAllNeededPaths() {
        Shared.path.spicetifyPath = (await Shell.get("spicetify path")).split(/\r?\n/).pop()
        Shared.path.spicetifyUserDataPath = (await Shell.get("spicetify path userdata")).split(/\r?\n/).pop()

        Shared.spicetifyConfig = ini.parse(fs.readFileSync(path.join(Shared.path.spicetifyUserDataPath, "config-xpui.ini"), "utf-8"))

        Shared.path.xpuiPath = path.join(Shared.spicetifyConfig.Setting.spotify_path, "Apps/xpui")
        Shared.path.cssMap = path.join(Shared.path.spicetifyPath, "css-map.json")
    }

    return {
        load: loadAllNeededPaths,
    }
})()

export default Path

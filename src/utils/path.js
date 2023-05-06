import path from "path"

import Shell from "./shell.js"

const Path = (() => {
    return {
        get: {
            xpui: (async () => path.join((await Shell.get("spicetify config spotify_path")).split(/\r?\n/).pop(), "Apps/xpui"))(),
            cssMap: (async () => path.join((await Shell.get("spicetify path")).split(/\r?\n/).pop(), "css-map.json"))(),
        },
    }
})()

export default Path

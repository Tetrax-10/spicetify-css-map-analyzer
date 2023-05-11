import fs from "fs"

const Glob = (() => {
    function getFileContents(filePath) {
        return fs.readFileSync(filePath, "utf-8")
    }

    function getJsonObject(filePath) {
        return JSON.parse(getFileContents(filePath))
    }

    return {
        getFileContents: getFileContents,
        getJsonObject: getJsonObject,
    }
})()

export default Glob

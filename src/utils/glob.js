import fs from "fs"

const Glob = (() => {
    function getFileContents(filePath) {
        return fs.readFileSync(filePath, "utf-8")
    }

    return {
        getFileContents: getFileContents,
    }
})()

export default Glob

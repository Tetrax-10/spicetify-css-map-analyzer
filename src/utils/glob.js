import fs from "fs"
import prettier from "prettier"

const Glob = (() => {
    const prettierConfig = getJsonObject("./.prettierrc.json")

    function getFileContents(filePath) {
        return fs.readFileSync(filePath, "utf-8")
    }

    function getJsonObject(filePath) {
        return JSON.parse(getFileContents(filePath))
    }

    function formatContent(content, parser) {
        return prettier.format(content, {
            parser: parser,
            ...prettierConfig,
        })
    }

    function writeJSON(filePath, object) {
        fs.writeFileSync(filePath, formatContent(JSON.stringify(object), "json"))
    }

    return {
        get: {
            fileContents: getFileContents,
            json: getJsonObject,
        },
        write: {
            json: writeJSON,
        },
    }
})()

export default Glob

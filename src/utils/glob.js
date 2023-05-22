import fs from "fs"
import prettier from "prettier"

const Glob = (() => {
    const prettierConfig = getJsonObject("./.prettierrc.json")

    function createFolder(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    }

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

    function writeFile(filePath, content) {
        fs.writeFileSync(filePath, content)
    }

    return {
        create: {
            folder: createFolder,
        },
        get: {
            fileContents: getFileContents,
            json: getJsonObject,
        },
        write: {
            file: writeFile,
            json: writeJSON,
        },
    }
})()

export default Glob

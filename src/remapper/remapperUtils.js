import fs from "fs"
import chalk from "chalk"
import path from "path"
import { diffCss, diffWords } from "diff"

import Shared from "./../shared/shared.js"
import Glob from "../utils/glob.js"

const RemapperUtils = (() => {
    function loadRemapFilesInfo() {
        const RemapFiles = []

        if (!fs.existsSync("./remap-data")) {
            return null
        }

        fs.readdirSync("./remap-data").forEach((file) => {
            const filePath = path.join("./remap-data", file)
            const fileExtension = path.extname(file)

            if (fs.statSync(filePath).isFile() && fileExtension === ".css") {
                RemapFiles.push(file)
            }
        })

        RemapFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, ignorePunctuation: true }))

        Shared.remap.version.old = path.parse(RemapFiles[0]).name
        Shared.remap.version.new = path.parse(RemapFiles[1]).name
    }

    function checkRemapDataAvailable() {
        if (fs.existsSync("./cached")) {
            if (fs.existsSync(`./cached/${Shared.remap.version.old}-${Shared.remap.version.new}.json`)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function getRemapData() {
        loadRemapFilesInfo()

        if (checkRemapDataAvailable()) {
            return getCachedRemapData()
        } else {
            return generateRemapData()
        }
    }

    function getCachedRemapData() {
        console.log(chalk.cyan(`Cached analyze data found for difference between ${Shared.remap.version.old} and ${Shared.remap.version.new}\n`))

        return JSON.parse(Glob.getFileContents(`./cached/${Shared.remap.version.old}-${Shared.remap.version.new}.json`))
    }

    function generateRemapData() {
        const oldRemapData = Glob.getFileContents(path.join("./remap-data", Shared.remap.version.old + ".css"))
        const newRemapData = Glob.getFileContents(path.join("./remap-data", Shared.remap.version.new + ".css"))

        console.log(chalk.cyan(`Analyzing difference between ${Shared.remap.version.old} and ${Shared.remap.version.new}...\n`))

        const cssDiff = diffCss(oldRemapData, newRemapData)

        if (!fs.existsSync("./cached")) {
            fs.mkdirSync("./cached")
        }

        const filteredCssDiff = filterDiff(cssDiff)

        Glob.saveObjectAsJSON(`./cached/${Shared.remap.version.old}-${Shared.remap.version.new}.json`, filteredCssDiff)

        return filteredCssDiff
    }

    function filterDiff(cssDiff) {
        return cssDiff.filter((difference) => {
            const diffHasHashClass = difference.value.match(Shared.regex.extractHashClass)
            const diffHasMappedClass = difference.value.match(Shared.regex.extractMappedClass)
            return (diffHasHashClass !== null || diffHasMappedClass !== null) && (difference.removed || difference.added)
        })
    }

    function getPossibleMatches(cssDiff) {
        const possibleMatches = {}

        for (let i = 0; i + 1 < cssDiff.length; i++) {
            const currentCssDiff = cssDiff[i]
            const nextCssDiff = cssDiff[i + 1]

            // To check if current difference has a mapped class
            const doesCurrentCssDiffHasMappedClass = currentCssDiff.value.match(Shared.regex.extractMappedClass) !== null
            // To check if next difference has a hash class
            const doesNextCssDiffHasHashClass = nextCssDiff.value.match(Shared.regex.extractHashClass) !== null

            if (
                currentCssDiff.removed &&
                nextCssDiff.added &&
                currentCssDiff.count === nextCssDiff.count &&
                doesCurrentCssDiffHasMappedClass &&
                doesNextCssDiffHasHashClass
            ) {
                const wordDiff = diffWords(currentCssDiff.value, nextCssDiff.value)

                for (let j = 0; j + 1 < wordDiff.length; j++) {
                    const currentWordDiff = wordDiff[j]
                    const nextWordDiff = wordDiff[j + 1]

                    const currentWordDiffMappedClass = `.${currentWordDiff.value}`.match(Shared.regex.extractMappedClass)
                    const nextWordDiffHashClass = `.${nextWordDiff.value}`.match(Shared.regex.extractHashClass)

                    if (currentWordDiff.removed && nextWordDiff.added && currentWordDiffMappedClass !== null && nextWordDiffHashClass !== null) {
                        const currentMappedClass = currentWordDiffMappedClass[0]
                        if (possibleMatches[currentMappedClass]) {
                            possibleMatches[currentMappedClass].push(...nextWordDiffHashClass)
                        } else {
                            possibleMatches[currentMappedClass] = nextWordDiffHashClass
                        }
                    }
                }
            }
        }

        return possibleMatches
    }

    return {
        getRemapData: getRemapData,
        getPossibleMatches: getPossibleMatches,
    }
})()

export default RemapperUtils

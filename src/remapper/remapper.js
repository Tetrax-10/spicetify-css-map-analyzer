import chalk from "chalk"

import RemapperUtils from "./remapperUtils.js"
import Utils from "./../utils/utils.js"
import Glob from "../utils/glob.js"
import Shared from "../shared/shared.js"

const Remapper = (() => {
    function remap() {
        const cssDiff = RemapperUtils.getRemapData()
        const possibleMatches = Utils.getMostRepeatedValues(RemapperUtils.getPossibleMatches(cssDiff))
        const finalCssMap = Utils.reverseObject(possibleMatches)

        const totalMatches = Object.keys(finalCssMap).length

        if (totalMatches) {
            console.log(chalk.yellow(`Mapped ${totalMatches} hash class${totalMatches === 1 ? "" : "es"}`), "\n")

            Glob.saveObjectAsJSON(`./css-map-${Shared.remap.version.old}-${Shared.remap.version.new}.json`, finalCssMap, true)

            console.log(finalCssMap, "\n")
        } else {
            console.log(chalk.yellow(`No new hash classes have been found`), "\n")
        }
    }

    return {
        remap: remap,
    }
})()

export default Remapper

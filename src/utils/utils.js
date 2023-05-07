import chalk from "chalk"

import Shared from "../shared/shared.js"

const Utils = (() => {
    function reverseObject(obj) {
        const reversed = {}

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                reversed[obj[key]] = key
            }
        }

        return reversed
    }

    function printUnmappedClasses(contentData, subStringData) {
        console.log()

        subStringData.forEach((substring) => {
            if (contentData.indexOf(substring) === -1) {
                Shared.latestCssMap.classes.unmapped.push(substring)
                if ((Shared.args.unmapped && !Shared.args.mapped) || (!Shared.args.unmapped && !Shared.args.mapped)) {
                    console.log(chalk.red(substring))
                }
            } else {
                Shared.latestCssMap.classes.mapped.push(substring)
                if (Shared.args.mapped) {
                    console.log(chalk.green(substring))
                } else if (!Shared.args.unmapped) {
                    console.log(chalk.dim(substring))
                }
            }
        })
    }

    return {
        reverseObject: reverseObject,
        printUnmappedClasses: printUnmappedClasses,
    }
})()

export default Utils

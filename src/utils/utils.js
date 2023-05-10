import chalk from "chalk"
import prettier from "prettier"

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

    function getMostRepeatedValues(obj) {
        const result = {}

        for (const key in obj) {
            const values = obj[key]

            const countMap = new Map()

            for (const value of values) {
                const count = (countMap.get(value) || 0) + 1
                countMap.set(value, count)
            }

            const maxCount = Math.max(...countMap.values())
            const mostRepeatedValues = Array.from(countMap.entries())
                .filter(([value, count]) => count === maxCount)
                .map(([value, count]) => value)

            result[key] = mostRepeatedValues.length === 1 ? mostRepeatedValues[0] : mostRepeatedValues
        }

        return result
    }

    function formatContent(content, parser) {
        return prettier.format(content, {
            parser: parser,
            tabWidth: 4,
            useTabs: true,
            semi: true,
            singleQuote: false,
        })
    }

    return {
        reverseObject: reverseObject,
        getMostRepeatedValues: getMostRepeatedValues,
        formatContent: formatContent,
    }
})()

export default Utils

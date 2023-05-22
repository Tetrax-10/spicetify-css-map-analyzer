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

    function getAbsoluteRegex(str) {
        return new RegExp("(?<!\\w|-)" + str + "(?!\\w|-)")
    }

    return {
        reverseObject: reverseObject,
        getAbsoluteRegex: getAbsoluteRegex,
    }
})()

export default Utils

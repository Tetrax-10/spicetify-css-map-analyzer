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

    return {
        reverseObject: reverseObject,
    }
})()

export default Utils

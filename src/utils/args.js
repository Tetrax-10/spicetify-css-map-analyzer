import chalk from "chalk"
import Shared from "../shared/shared.js"

const Args = (() => {
    function isValid() {
        const argsLength = Object.keys(Shared.args)

        if (Shared.args.remap && argsLength === 1) {
            console.log(chalk.red("Can't use other options with --remap"))
            return false
        } else {
            return true
        }
    }

    return {
        isValid: isValid,
    }
})()

export default Args

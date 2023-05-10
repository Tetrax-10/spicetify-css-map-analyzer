import chalk from "chalk"

import { exec } from "child_process"
import { promisify } from "util"

const Shell = (() => {
    async function waitForCommandToFinish(command) {
        const promisedExec = promisify(exec)

        try {
            await promisedExec(command)
        } catch {
            console.log(chalk.red("Error: Cant promisify 'exec' from 'child_process'"))
        }
    }

    function getOutput(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(stdout.trim())
            })
        })
    }

    return {
        waitForCommandToFinish: waitForCommandToFinish,
        get: getOutput,
    }
})()

export default Shell

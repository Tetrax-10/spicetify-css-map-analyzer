import { exec } from "child_process"
import chalk from "chalk"

const Shell = (() => {
    function waitForCommandToFinish(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error) => {
                if (error) {
                    console.error(chalk.red(error))
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
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
        execute: waitForCommandToFinish,
        get: getOutput,
    }
})()

export default Shell

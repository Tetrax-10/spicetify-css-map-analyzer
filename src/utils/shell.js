import { exec } from "child_process"

const Shell = (() => {
    function waitForCommandToFinish(command) {
        return new Promise((resolve) => {
            exec(command, () => resolve())
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

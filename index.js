const fs = require("fs");
const childProcess = require("child_process");

module.exports = (hermione) => {
    let selenium;

    hermione.on(hermione.events.RUNNER_START, async () => {
        const file = fs.openSync("selenium.log", "w");

        selenium = childProcess.spawn("selenium-standalone", ["start"], {
            stdio: ["ignore", file, file],
        });
    });

    hermione.on(hermione.events.RUNNER_END, () => {
        return new Promise(resolve => {
            selenium.on('exit', () => resolve());

            selenium.kill();
        });
    });
}

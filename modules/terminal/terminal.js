// modules/terminal/terminal.js

const { exec } = require("child_process");
const speak = require("../../speak-output");

function runTerminalCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            speak.sayText(`Error: ${stderr}`);
            return callback(`Error: ${stderr}`);
        }
        speak.sayText(`Output: ${stdout}`);
        callback(stdout);
    });
}

module.exports = {
    runTerminalCommand
};

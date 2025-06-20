// modules/terminal/terminal.js

const { exec } = require("child_process");

function executeTerminalCommand(command, callback) {
    if (!command) {
        callback("No command provided.");
        return;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: ${stderr || error.message}`);
        } else {
            callback(stdout || "Command executed.");
        }
    });
}

module.exports = {
    executeTerminalCommand,
};

// modules/system/system.js

const { exec } = require("child_process");

function executeSystemCommand(command, callback) {
    let cmd = "";

    switch (command.toLowerCase()) {
        case "shutdown":
            cmd = "sudo shutdown now";
            break;
        case "restart":
            cmd = "sudo reboot";
            break;
        case "open terminal":
            cmd = "lxterminal";
            break;
        case "open browser":
            cmd = "chromium-browser";
            break;
        case "system info":
            cmd = "neofetch || uname -a";
            break;
        default:
            callback("I didn't understand that system command.");
            return;
    }

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: ${stderr || error.message}`);
        } else {
            callback(stdout || "Command executed successfully.");
        }
    });
}

module.exports = {
    executeSystemCommand,
};

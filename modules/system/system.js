// modules/system/system.js

const { exec } = require("child_process");

function reboot(callback) {
    exec("sudo reboot", (error, stdout, stderr) => {
        if (error) return callback(`Error rebooting: ${stderr}`);
        callback("System rebooting...");
    });
}

function shutdown(callback) {
    exec("sudo shutdown now", (error, stdout, stderr) => {
        if (error) return callback(`Error shutting down: ${stderr}`);
        callback("Shutting down now...");
    });
}

function openApp(appName, callback) {
    exec(appName, (error, stdout, stderr) => {
        if (error) return callback(`Error opening ${appName}: ${stderr}`);
        callback(`${appName} opened.`);
    });
}

function runCommand(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) return callback(`Command error: ${stderr}`);
        callback(stdout);
    });
}

module.exports = {
    reboot,
    shutdown,
    openApp,
    runCommand
};

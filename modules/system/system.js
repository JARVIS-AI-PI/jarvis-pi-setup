const { exec } = require("child_process");

function openApp(appName, callback) {
  exec(`${appName} &`, (err) => {
    if (err) return callback("Failed to open " + appName);
    callback(`${appName} launched`);
  });
}

function shutdown(callback) {
  exec("sudo shutdown now", (err) => {
    if (err) return callback("Shutdown failed");
    callback("System shutting down...");
  });
}

function reboot(callback) {
  exec("sudo reboot", (err) => {
    if (err) return callback("Reboot failed");
    callback("Rebooting system...");
  });
}

module.exports = {
  openApp,
  shutdown,
  reboot,
};

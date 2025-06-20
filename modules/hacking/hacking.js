// modules/hacking/hacking.js

const { exec } = require("child_process");

module.exports = {
  name: "hacking",
  description: "Scan your local network for connected devices",

  run(args, callback) {
    console.log("[Hacking] Scanning local network...");

    // Use 'arp -a' to list known devices
    exec("arp -a", (error, stdout, stderr) => {
      if (error) {
        callback(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        callback(`stderr: ${stderr}`);
        return;
      }

      // Return scan result
      callback(stdout);
    });
  }
};

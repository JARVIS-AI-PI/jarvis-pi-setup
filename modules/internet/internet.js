// modules/internet/internet.js

const { exec } = require("child_process");

module.exports = {
  name: "internet",
  description: "Control or check internet connectivity",

  run(args, callback) {
    const action = args[0];

    if (!action || action === "status") {
      exec("ping -c 1 google.com", (err) => {
        if (err) {
          callback("📡 Offline: No internet connection.");
        } else {
          callback("✅ Online: Internet is working.");
        }
      });
      return;
    }

    if (action === "off") {
      exec("nmcli radio wifi off", (err) => {
        if (err) return callback("❌ Failed to disable Wi-Fi.");
        callback("📴 Wi-Fi turned off.");
      });
    } else if (action === "on") {
      exec("nmcli radio wifi on", (err) => {
        if (err) return callback("❌ Failed to enable Wi-Fi.");
        callback("📶 Wi-Fi turned on.");
      });
    } else {
      callback("Usage:\n• internet status\n• internet on\n• internet off");
    }
  }
};

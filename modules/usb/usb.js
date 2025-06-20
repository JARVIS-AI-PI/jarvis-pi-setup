// modules/usb/usb.js

const { exec } = require("child_process");

module.exports = {
  name: "usb",
  description: "List connected USB devices",

  run(args, callback) {
    exec("lsusb", (error, stdout, stderr) => {
      if (error) {
        return callback(`❌ Error: ${error.message}`);
      }
      if (stderr) {
        return callback(`⚠️ stderr: ${stderr}`);
      }

      callback("🔌 Connected USB Devices:\n" + stdout);
    });
  }
};

// modules/firewall/firewall.js

const { exec } = require("child_process");

module.exports = {
  name: "firewall",
  description: "Control the firewall: status, enable, disable, allow/block ports",

  run(args, callback) {
    const command = args[0] || "status";

    let ufwCommand = "";

    switch (command) {
      case "status":
        ufwCommand = "sudo ufw status";
        break;
      case "enable":
        ufwCommand = "sudo ufw enable";
        break;
      case "disable":
        ufwCommand = "sudo ufw disable";
        break;
      case "block":
        const portToBlock = args[1];
        if (!portToBlock) return callback("⚠️ Please specify a port to block.");
        ufwCommand = `sudo ufw deny ${portToBlock}`;
        break;
      case "allow":
        const portToAllow = args[1];
        if (!portToAllow) return callback("⚠️ Please specify a port to allow.");
        ufwCommand = `sudo ufw allow ${portToAllow}`;
        break;
      default:
        return callback("❓ Unknown command. Use: status, enable, disable, allow [port], block [port]");
    }

    exec(ufwCommand, (error, stdout, stderr) => {
      if (error) {
        callback(`❌ Error: ${error.message}`);
        return;
      }
      if (stderr) {
        callback(`⚠️ stderr: ${stderr}`);
        return;
      }
      callback(stdout);
    });
  }
};

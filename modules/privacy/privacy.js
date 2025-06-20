// modules/privacy/privacy.js

const { exec } = require("child_process");
const https = require("https");

module.exports = {
  name: "privacy",
  description: "Show IP, toggle VPN, or suggest privacy tips",

  run(args, callback) {
    const cmd = args[0];

    if (!cmd || cmd === "ip") {
      https.get("https://api.ipify.org", (res) => {
        let ip = "";
        res.on("data", (chunk) => ip += chunk);
        res.on("end", () => {
          callback(`🌍 Public IP: ${ip}`);
        });
      }).on("error", () => {
        callback("📡 No internet or failed to fetch IP.");
      });
      return;
    }

    if (cmd === "vpn-on") {
      exec("sudo systemctl start openvpn", (err) => {
        if (err) return callback("❌ Failed to start VPN.");
        callback("🛡️ VPN started.");
      });
    } else if (cmd === "vpn-off") {
      exec("sudo systemctl stop openvpn", (err) => {
        if (err) return callback("❌ Failed to stop VPN.");
        callback("🔓 VPN stopped.");
      });
    } else if (cmd === "tips") {
      callback(`🕶️ Privacy Tips:
1. Use a VPN (Jarvis can help toggle it).
2. Use DuckDuckGo or Tor for anonymous browsing.
3. Disable location and Bluetooth when not needed.
4. Avoid logging into unknown networks.`);
    } else {
      callback("Usage:\n• privacy ip\n• privacy vpn-on\n• privacy vpn-off\n• privacy tips");
    }
  }
};

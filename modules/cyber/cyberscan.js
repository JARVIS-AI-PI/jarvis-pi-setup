const https = require('https');
const dns = require('dns');
const { exec } = require('child_process');

function scanWebsite(target, callback) {
  dns.lookup(target, (err, address) => {
    if (err) return callback("Target not reachable.");

    const result = [];
    result.push(`🔎 Target IP: ${address}`);

    // Ping test
    exec(`ping -c 1 ${address}`, (error, stdout) => {
      if (error) {
        result.push("❌ Ping failed.");
      } else {
        result.push("✅ Ping successful.");
      }

      // SSL check
      const options = {
        method: "GET",
        host: target,
        port: 443,
        path: "/"
      };

      const req = https.request(options, res => {
        result.push(`🔐 SSL Enabled: Yes`);
        result.push(`📄 Headers:`);
        Object.entries(res.headers).forEach(([key, value]) => {
          result.push(`  - ${key}: ${value}`);
        });

        callback(result.join("\n"));
      });

      req.on("error", () => {
        result.push("🔐 SSL check failed or no SSL.");
        callback(result.join("\n"));
      });

      req.end();
    });
  });
}

module.exports = { scanWebsite };

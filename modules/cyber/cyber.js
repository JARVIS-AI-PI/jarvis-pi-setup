const { exec } = require("child_process");

function scanNetwork(callback) {
  exec("arp -a", (err, stdout, stderr) => {
    if (err) return callback("Scan error: " + err.message);
    callback("Connected Devices:\n" + stdout);
  });
}

function portScan(ip, callback) {
  const command = `nmap -p 1-1000 ${ip}`;
  exec(command, (err, stdout, stderr) => {
    if (err) return callback("Scan error: " + err.message);
    callback("Port Scan Result:\n" + stdout);
  });
}

module.exports = { scanNetwork, portScan };

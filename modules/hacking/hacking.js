const { exec } = require("child_process");

// Nmap scan (for open ports and services)
function runNmapScan(target) {
  exec(`nmap ${target}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[HACKING] Nmap Error:\n${stderr}`);
      return;
    }
    console.log(`[HACKING] Nmap Scan Results:\n${stdout}`);
  });
}

// Whois lookup
function runWhois(target) {
  exec(`whois ${target}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[HACKING] Whois Error:\n${stderr}`);
      return;
    }
    console.log(`[HACKING] Whois Info:\n${stdout}`);
  });
}

// Get your local IP address
function getMyIP() {
  exec("hostname -I", (error, stdout, stderr) => {
    if (error) {
      console.error(`[HACKING] IP Error:\n${stderr}`);
      return;
    }
    console.log(`[HACKING] Your IP:\n${stdout}`);
  });
}

module.exports = {
  runNmapScan,
  runWhois,
  getMyIP
};

const { exec } = require("child_process");

function runNmapScan(target) {
  exec(`nmap ${target}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[HACKING] Error: ${stderr}`);
      return;
    }
    console.log(`[HACKING] Nmap Results:\n${stdout}`);
  });
}

module.exports = { runNmapScan };

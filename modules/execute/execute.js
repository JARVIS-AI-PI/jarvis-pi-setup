const { exec } = require("child_process");

function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("[ERROR]", error.message);
      callback(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.warn("[STDERR]", stderr);
      callback(`Warning: ${stderr}`);
      return;
    }

    console.log("[OUTPUT]", stdout);
    callback(stdout.trim());
  });
}

module.exports = { runCommand };

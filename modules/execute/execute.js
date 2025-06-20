// modules/execute/execute.js

const { exec } = require("child_process");

function executeCommand(command, callback) {
  if (!command) return callback("No command provided.");

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution error:", error.message);
      return callback(`Error: ${error.message}`);
    }
    if (stderr) {
      console.warn("Standard error:", stderr);
      return callback(`Stderr: ${stderr}`);
    }

    callback(stdout || "Command executed.");
  });
}

module.exports = executeCommand;

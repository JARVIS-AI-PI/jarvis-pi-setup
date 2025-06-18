const { exec } = require("child_process");

function runTerminalCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`[TERMINAL ERROR]: ${stderr}`);
      callback(`Error: ${stderr}`);
      return;
    }
    console.log(`[TERMINAL OUTPUT]: ${stdout}`);
    callback(stdout);
  });
}

module.exports = { runTerminalCommand };

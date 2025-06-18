const flash = require('../modules/flash/flash');
const system = require('../modules/system/system');

function interpret(command, respond) {
  command = command.toLowerCase();

  // Handle system-level commands
  if (command.includes("open terminal")) {
    system.openApp("lxterminal", respond);
  } else if (command.includes("reboot")) {
    system.reboot(respond);
  } else if (command.includes("shutdown")) {
    system.shutdown(respond);

  // Handle Flash module
  } else if (command.includes("flash")) {
    flash.run(command, respond);

  } else {
    respond("Sorry, I don't understand that command.");
  }
}

module.exports = { interpret };

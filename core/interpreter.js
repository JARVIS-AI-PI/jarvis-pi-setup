const { flashMessage } = require("../modules/flash/flash");
const { openTerminal } = require("../modules/terminal/terminal");
const { openNotes } = require("../modules/notes/notes");
const { getWeather } = require("../modules/weather/weather");
const { runSystemCommand } = require("../modules/system/system");
const { speak } = require("../speak-output");
const { executeCode } = require("../modules/execute/execute");
const { startVoiceRecognition } = require("../modules/voice/voice");

function interpret(command) {
  command = command.toLowerCase();

  if (command.includes("open terminal")) {
    flashMessage("Opening terminal");
    openTerminal();
  }

  else if (command.includes("open notes")) {
    flashMessage("Opening notes");
    openNotes();
  }

  else if (command.includes("weather")) {
    flashMessage("Checking weather");
    getWeather();
  }

  else if (command.startsWith("run system")) {
    const sysCmd = command.replace("run system", "").trim();
    flashMessage(`Running: ${sysCmd}`);
    runSystemCommand(sysCmd);
  }

  else if (command.includes("say") || command.startsWith("speak")) {
    const message = command.replace("say", "").replace("speak", "").trim();
    flashMessage(message);
    speak(message);
  }

  else if (command.includes("run code")) {
    const code = command.replace("run code", "").trim();
    flashMessage("Executing code");
    executeCode(code);
  }

  else if (command.includes("start voice")) {
    flashMessage("Voice recognition started");
    startVoiceRecognition();
  }

  else {
    flashMessage("Command not recognized.");
    console.log("Unknown command:", command);
  }
}

module.exports = { interpret };

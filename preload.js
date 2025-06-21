// preload.js

const { contextBridge } = require("electron");
const { handleInput } = require("./main");

contextBridge.exposeInMainWorld("jarvis", {
  call: (input) => {
    return new Promise((resolve) => {
      try {
        handleInputWithOutput(input, resolve);
      } catch (err) {
        resolve(`❌ Error: ${err.message}`);
      }
    });
  }
});

function handleInputWithOutput(input, callback) {
  const args = input.trim().split(" ");
  const command = args.shift().toLowerCase();

  const modules = require("./core/module-loader");
  const mod = modules.find(m => m.name === command);

  if (!mod) {
    callback(`❌ Command not found: '${command}'`);
    return;
  }

  try {
    mod.run(args, callback);
  } catch (err) {
    callback(`❌ Module error: ${err.message}`);
  }
}

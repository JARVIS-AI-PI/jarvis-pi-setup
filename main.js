// main.js

const readline = require("readline");
const modules = require("./core/module-loader");

function handleInput(input) {
  const args = input.trim().split(" ");
  const command = args.shift().toLowerCase();

  const mod = modules.find(m => m.name === command);

  if (!mod) {
    console.log(`❌ Command not found: '${command}'`);
    return;
  }

  try {
    mod.run(args, (output) => {
      console.log(`💬 ${output}`);
    });
  } catch (err) {
    console.error(`❌ Error running module '${command}':`, err.message);
  }
}

// If running in terminal, enable manual input
if (require.main === module) {
  console.log("🧠 JARVIS AI Terminal Mode\nType a command (e.g., tutor gravity):");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("line", (input) => {
    handleInput(input);
  });
}

// Export the handler for preload.js or frontend use
module.exports = { handleInput };

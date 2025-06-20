// core/interpreter.js

const modules = require('../modules/index.js');

async function interpret(input) {
  input = input.toLowerCase();

  for (const mod of modules) {
    if (mod.match && mod.match(input)) {
      try {
        const response = await mod.execute(input);
        return response || "Done.";
      } catch (err) {
        return `Error in ${mod.name || 'module'}: ${err.message}`;
      }
    }
  }

  return "I'm sorry, I didn't understand that.";
}

module.exports = interpret;

// core/interpreter.js
const modules = require('../modules/index.js');

// This function handles all user input and sends it to the correct module
async function interpret(input) {
  for (let mod of modules) {
    try {
      if (typeof mod.match === 'function' && mod.match(input)) {
        // Run the correct module's response
        return await mod.execute(input, (reply) => reply);
      }
    } catch (err) {
      return `⚠️ Error in ${mod.name}: ${err.message}`;
    }
  }

  // If no module matched
  return "❌ Sorry, I didn't understand that.";
}

module.exports = interpret;

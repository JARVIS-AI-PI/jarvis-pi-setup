// core/interpreter.js
const modules = require('../modules/index.js');

async function interpret(input, say) {
  for (let mod of modules) {
    if (typeof mod.match === 'function' && mod.match(input)) {
      try {
        return await mod.execute(input, say);
      } catch (err) {
        return `Error in ${mod.name}: ${err.message}`;
      }
    }
  }
  return "Sorry, I didn't understand that.";
}

module.exports = interpret;

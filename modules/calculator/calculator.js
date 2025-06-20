// modules/calculator/calculator.js
module.exports = {
  name: 'calculator',
  match: input => /^[0-9\+\-\*\/\.\s]+$/.test(input.trim()),
  execute: async (input, say) => {
    try {
      const result = eval(input);
      say(`The answer is ${result}`);
    } catch (err) {
      say("I couldn't calculate that.");
    }
  }
};

// core/interpreter.js

const path = require('path');
const modules = require('../modules/index.js/index.js');

async function interpret(inputText) {
    console.log(`[Interpreter] Received input: "${inputText}"`);

    // Convert input to lowercase for easier matching
    const text = inputText.toLowerCase();

    // Loop through modules and let each try to respond
    for (const [name, module] of Object.entries(modules)) {
        try {
            const result = await module.respond(text);
            if (result) {
                console.log(`[Interpreter] Responding via ${name} module.`);
                return result;
            }
        } catch (error) {
            console.error(`[Interpreter] Error in module '${name}':`, error);
        }
    }

    return `I'm sorry, I couldn't understand that.`;
}

module.exports = { interpret };

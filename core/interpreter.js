// interpreter.js — understands input and routes to modules

const fs = require('fs');
const path = require('path');

const MODULES_PATH = path.join(__dirname, '..', 'modules');

function loadModules() {
    const modules = {};
    const folders = fs.readdirSync(MODULES_PATH);

    folders.forEach(folder => {
        const modulePath = path.join(MODULES_PATH, folder, `${folder}.js`);
        if (fs.existsSync(modulePath)) {
            try {
                modules[folder] = require(modulePath);
            } catch (err) {
                console.error(`Error loading ${folder}:`, err);
            }
        }
    });

    return modules;
}

const modules = loadModules();

async function interpret(input, context = {}) {
    input = input.trim().toLowerCase();

    for (const [name, mod] of Object.entries(modules)) {
        if (typeof mod.match === 'function' && await mod.match(input)) {
            if (typeof mod.execute === 'function') {
                return await mod.execute(input, context);
            }
        }
    }

    return "I'm not sure how to respond to that yet.";
}

module.exports = { interpret };

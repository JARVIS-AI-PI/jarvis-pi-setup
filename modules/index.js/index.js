// modules/index.js/index.js

const fs = require('fs');
const path = require('path');

const modules = {};
const modulesPath = path.join(__dirname, '..');

// List all folders in /modules
const moduleDirs = fs.readdirSync(modulesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// Try to load each module's .js file
for (const moduleName of moduleDirs) {
    const moduleFile = path.join(modulesPath, moduleName, `${moduleName}.js`);
    if (fs.existsSync(moduleFile)) {
        try {
            const loaded = require(moduleFile);
            if (typeof loaded.respond === 'function') {
                modules[moduleName] = loaded;
                console.log(`[Loader] Module loaded: ${moduleName}`);
            } else {
                console.warn(`[Loader] Skipped ${moduleName}: No 'respond' function`);
            }
        } catch (err) {
            console.error(`[Loader] Error loading module "${moduleName}":`, err.message);
        }
    }
}

module.exports = modules;

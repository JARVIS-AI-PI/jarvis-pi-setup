const fs = require('fs');
const path = require('path');

const modulesPath = path.join(__dirname, '..', 'modules');
const modules = {};

fs.readdirSync(modulesPath).forEach(folder => {
  const moduleFile = path.join(modulesPath, folder, `${folder}.js`);
  if (fs.existsSync(moduleFile)) {
    try {
      modules[folder] = require(moduleFile);
    } catch (err) {
      console.error(`❌ Failed to load module '${folder}':`, err);
    }
  } else {
    console.warn(`⚠️ No module file found for '${folder}'`);
  }
});

function interpret(command, callback) {
  const commandLower = command.toLowerCase();

  for (const [name, mod] of Object.entries(modules)) {
    if (typeof mod.match === 'function' && mod.match(commandLower)) {
      if (typeof mod.execute === 'function') {
        return mod.execute(commandLower, callback);
      } else {
        console.warn(`⚠️ Module '${name}' has no execute()`);
      }
    }
  }

  callback(`Sorry, I didn’t understand: "${command}"`);
}

module.exports = { interpret };

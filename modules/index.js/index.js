// modules/index.js
const fs = require('fs');
const path = require('path');

const modulesDir = __dirname;
const modules = [];

fs.readdirSync(modulesDir, { withFileTypes: true }).forEach(dirent => {
  if (!dirent.isDirectory()) return;
  const file = path.join(modulesDir, dirent.name, `${dirent.name}.js`);
  if (fs.existsSync(file)) {
    modules.push(require(file));
  }
});

module.exports = modules;

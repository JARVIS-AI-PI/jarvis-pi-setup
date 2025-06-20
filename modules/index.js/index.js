const fs = require('fs');
const path = require('path');

const modules = [];

fs.readdirSync(__dirname).forEach(folder => {
  const modPath = path.join(__dirname, folder);
  if (fs.lstatSync(modPath).isDirectory()) {
    const file = path.join(modPath, `${folder}.js`);
    if (fs.existsSync(file)) {
      modules.push(require(file));
    }
  }
});

module.exports = modules;

// core/module-loader.js

const fs = require("fs");
const path = require("path");

const modulesDir = path.join(__dirname, "../modules");
const modules = [];

fs.readdirSync(modulesDir).forEach(folder => {
  const folderPath = path.join(modulesDir, folder);

  // Only include subfolders
  if (fs.statSync(folderPath).isDirectory()) {
    const moduleFile = path.join(folderPath, `${folder}.js`);

    if (fs.existsSync(moduleFile)) {
      try {
        const mod = require(moduleFile);
        modules.push(mod);
      } catch (error) {
        console.error(`❌ Error loading module ${folder}:`, error.message);
      }
    }
  }
});

module.exports = modules;

// /modules/index.js — dynamically lists all module folders

const fs = require('fs');
const path = require('path');

const modulesPath = path.join(__dirname);

const modules = fs.readdirSync(modulesPath).filter(file =>
    fs.statSync(path.join(modulesPath, file)).isDirectory()
);

module.exports = modules;

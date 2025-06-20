// modules/memory/memory.js

const fs = require("fs");
const path = require("path");

const memoryFile = path.join(__dirname, "memory.json");

let memory = {};

function loadMemory() {
  if (fs.existsSync(memoryFile)) {
    memory = JSON.parse(fs.readFileSync(memoryFile));
  }
}

function saveMemory() {
  fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
}

loadMemory();

module.exports = async function handleMemory(query) {
  const lower = query.toLowerCase();

  if (lower.startsWith("remember")) {
    const statement = lower.replace("remember", "").trim();
    const [key, value] = statement.split(" is ");
    if (key && value) {
      memory[key.trim()] = value.trim();
      saveMemory();
      return `Okay, I will remember that ${key.trim()} is ${value.trim()}.`;
    }
  }

  if (lower.startsWith("what is") || lower.startsWith("who is")) {
    const key = lower.replace("what is", "").replace("who is", "").trim();
    const answer = memory[key];
    if (answer) {
      return `${key} is ${answer}.`;
    } else {
      return `I don't remember anything about ${key}.`;
    }
  }

  return `I don't know how to process that memory command.`;
};

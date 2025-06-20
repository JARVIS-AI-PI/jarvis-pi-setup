// modules/knowledge/knowledge.js

const fs = require("fs");
const path = require("path");

module.exports = {
  name: "knowledge",
  description: "Offline AI brain that searches local knowledge database",

  run(args, callback) {
    const query = args.join(" ").toLowerCase();
    if (!query) return callback("❓ Ask me something from general knowledge.");

    const dbPath = path.join(__dirname, "data.json");

    if (!fs.existsSync(dbPath)) {
      return callback("🧠 No knowledge base found. Please add 'data.json' in the same folder.");
    }

    const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const match = data.find(entry => {
      return entry.keywords.some(k => query.includes(k.toLowerCase()));
    });

    if (match) {
      callback("🧠 " + match.answer);
    } else {
      callback("🤖 Sorry, I don’t have an answer for that yet.");
    }
  }
};

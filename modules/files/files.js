const fs = require('fs');
const path = require('path');

module.exports = {
  name: "files",
  execute(input, say) {
    if (input.includes("create file")) {
      const parts = input.split("called ");
      const filename = (parts[1] || "untitled").replace(/[^a-z0-9_.-]/gi, '_').trim();
      const fullPath = path.join(__dirname, "../../", `${filename}.txt`);
      fs.writeFileSync(fullPath, "File created by Jarvis AI.");
      say(`File '${filename}.txt' has been created.`);
    } else if (input.includes("delete file")) {
      const parts = input.split("file ");
      const filename = (parts[1] || "").replace(/[^a-z0-9_.-]/gi, '_').trim();
      const fullPath = path.join(__dirname, "../../", filename);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        say(`File '${filename}' deleted.`);
      } else {
        say("That file does not exist.");
      }
    }
  }
};

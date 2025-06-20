// modules/file-manager/file-manager.js

const fs = require("fs");
const path = require("path");

module.exports = {
  name: "file-manager",
  description: "Manage files: list, read, write, delete",

  run(args, callback) {
    const command = args[0];
    const target = args[1];
    const content = args.slice(2).join(" ");
    const basePath = path.join(__dirname, "../../../"); // Root directory of the project

    if (!command) {
      return callback("🗂️ Usage: list | read <file> | write <file> <text> | delete <file>");
    }

    switch (command) {
      case "list":
        fs.readdir(basePath, (err, files) => {
          if (err) return callback("❌ Error listing files.");
          callback("📁 Files:\n" + files.join("\n"));
        });
        break;

      case "read":
        if (!target) return callback("📖 Please provide a file name to read.");
        fs.readFile(path.join(basePath, target), "utf-8", (err, data) => {
          if (err) return callback("❌ Could not read file.");
          callback("📄 File content:\n" + data);
        });
        break;

      case "write":
        if (!target || !content) return callback("✍️ Usage: write <file> <text>");
        fs.writeFile(path.join(basePath, target), content, (err) => {
          if (err) return callback("❌ Failed to write file.");
          callback("✅ File written successfully.");
        });
        break;

      case "delete":
        if (!target) return callback("🗑️ Provide a file name to delete.");
        fs.unlink(path.join(basePath, target), (err) => {
          if (err) return callback("❌ Failed to delete file.");
          callback("🗑️ File deleted successfully.");
        });
        break;

      default:
        callback("❓ Unknown command. Use: list | read <file> | write <file> <text> | delete <file>");
    }
  }
};

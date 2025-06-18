const fs = require('fs');
const path = require('path');

function saveNote(filename, content, callback) {
  const notesDir = path.join(__dirname, '../saved_notes');
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
  }

  const filePath = path.join(notesDir, filename);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("[NOTES ERROR]:", err);
      callback(`Failed to save note: ${err.message}`);
    } else {
      console.log(`[NOTE SAVED]: ${filename}`);
      callback(`Note "${filename}" saved successfully.`);
    }
  });
}

module.exports = { saveNote };

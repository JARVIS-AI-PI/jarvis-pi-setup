// modules/notes/notes.js

const fs = require("fs");
const notesPath = "./jarvis-data/notes.json";

function loadNotes() {
  if (!fs.existsSync(notesPath)) return [];
  try {
    const data = fs.readFileSync(notesPath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}

module.exports = async function handleNotes(input) {
  const text = input.toLowerCase();
  const notes = loadNotes();

  if (text.startsWith("make a note") || text.startsWith("note")) {
    const noteText = input.replace(/(make a note|note down|note)\s?/i, "").trim();
    if (!noteText) return "What should I note down?";
    notes.push({ text: noteText, date: new Date().toLocaleString() });
    saveNotes(notes);
    return `Noted: ${noteText}`;
  }

  if (text.includes("show my notes") || text.includes("list notes")) {
    if (notes.length === 0) return "You have no saved notes.";
    return notes.map((n, i) => `${i + 1}. ${n.text} (${n.date})`).join("\n");
  }

  if (text.includes("delete all notes")) {
    saveNotes([]);
    return "All notes deleted.";
  }

  return false;
};

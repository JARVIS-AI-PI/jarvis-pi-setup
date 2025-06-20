// modules/notes/notes.js

const fs = require("fs");
const path = require("path");

const notesFile = path.join(__dirname, "user-notes.json");

function saveNote(text, callback) {
    if (!text) return callback("Note is empty.");

    let notes = [];
    if (fs.existsSync(notesFile)) {
        notes = JSON.parse(fs.readFileSync(notesFile, "utf-8"));
    }

    const note = {
        text: text,
        timestamp: new Date().toISOString(),
    };

    notes.push(note);
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));

    callback("Note saved.");
}

function readNotes(callback) {
    if (!fs.existsSync(notesFile)) {
        return callback("No notes found.");
    }

    const notes = JSON.parse(fs.readFileSync(notesFile, "utf-8"));
    if (notes.length === 0) return callback("No notes available.");

    const noteTexts = notes.map((n, i) => `${i + 1}. ${n.text}`).join("\n");
    callback(noteTexts);
}

function deleteLastNote(callback) {
    if (!fs.existsSync(notesFile)) return callback("No notes to delete.");

    let notes = JSON.parse(fs.readFileSync(notesFile, "utf-8"));
    if (notes.length === 0) return callback("No notes found.");

    notes.pop();
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
    callback("Last note deleted.");
}

module.exports = {
    saveNote,
    readNotes,
    deleteLastNote,
};

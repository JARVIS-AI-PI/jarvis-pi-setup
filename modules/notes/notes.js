// modules/notes/notes.js

const fs = require("fs");
const path = require("path");

const notesFile = path.join(__dirname, "jarvis-notes.json");

function loadNotes() {
    try {
        return JSON.parse(fs.readFileSync(notesFile, "utf8"));
    } catch (err) {
        return {};
    }
}

function saveNotes(notes) {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

function addNote(topic, content) {
    const notes = loadNotes();
    notes[topic.toLowerCase()] = content;
    saveNotes(notes);
    return `Noted: ${topic}`;
}

function getNote(topic) {
    const notes = loadNotes();
    return notes[topic.toLowerCase()] || `No memory found for: ${topic}`;
}

function deleteNote(topic) {
    const notes = loadNotes();
    if (notes[topic.toLowerCase()]) {
        delete notes[topic.toLowerCase()];
        saveNotes(notes);
        return `Deleted note: ${topic}`;
    } else {
        return `No memory to delete for: ${topic}`;
    }
}

module.exports = {
    addNote,
    getNote,
    deleteNote,
};

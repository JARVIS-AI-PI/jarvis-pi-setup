// modules/voice/voice.js

const { exec } = require("child_process");
const os = require("os");

// Use eSpeak (offline) for voice output
function speak(text) {
  if (!text) return;

  // Escape special characters
  text = text.replace(/["`$\\]/g, "");

  const command = `espeak "${text}" --stdout | aplay`;
  exec(command, (error) => {
    if (error) {
      console.error("Voice Error:", error);
    }
  });
}

module.exports = speak;

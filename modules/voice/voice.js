// modules/voice/voice.js

const { exec } = require("child_process");

function speak(text) {
    const command = `espeak "${text.replace(/"/g, '\\"')}" --stdout | aplay`;
    exec(command, (err) => {
        if (err) {
            console.error("[voice module] Speech error:", err);
        }
    });
}

module.exports = { speak };

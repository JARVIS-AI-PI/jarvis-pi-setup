const { exec } = require("child_process");
const fs = require("fs");

function listen(callback) {
  const outputFile = "/tmp/voice.wav";

  // Record for 5 seconds
  exec(`arecord -D plughw:1,0 -f cd -t wav -d 5 -q -r 16000 ${outputFile}`, (err) => {
    if (err) return console.error("Mic error:", err);

    // Use speech recognition (offline/local if possible)
    exec(`python3 mic-listener.py ${outputFile}`, (err, stdout) => {
      if (err) return console.error("Recognition error:", err);

      const text = stdout.trim();
      console.log("[VOICE]", text);
      callback(text);
    });
  });
}

module.exports = { listen };

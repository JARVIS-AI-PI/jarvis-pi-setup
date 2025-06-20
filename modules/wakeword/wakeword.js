// modules/wakeword/wakeword.js

let wakeWordEnabled = false;

module.exports = {
  name: "wakeword",
  description: "Toggle 'Hey Jarvis' wake word listening mode",

  run(args, callback) {
    const action = args[0];

    if (action === "on") {
      wakeWordEnabled = true;
      callback("🎤 Wake word 'Hey Jarvis' is now ON (simulated).");
    } else if (action === "off") {
      wakeWordEnabled = false;
      callback("🔇 Wake word is now OFF.");
    } else if (action === "status") {
      callback(`🔁 Wake word is currently ${wakeWordEnabled ? "ON ✅" : "OFF ❌"}`);
    } else {
      callback("Usage:\n• wakeword on\n• wakeword off\n• wakeword status");
    }
  },

  isEnabled() {
    return wakeWordEnabled;
  }
};

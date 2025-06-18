const { exec } = require("child_process");

// Simple offline-like response system
function getChatResponse(message) {
  message = message.toLowerCase();

  if (message.includes("hello") || message.includes("hi")) {
    return "Hello! How can I assist you today?";
  }
  if (message.includes("who are you")) {
    return "I am Jarvis, your personal AI assistant.";
  }
  if (message.includes("how are you")) {
    return "I'm functioning as expected. How can I help?";
  }
  if (message.includes("time")) {
    return new Date().toLocaleTimeString();
  }

  return "I'm still learning. Please try another question.";
}

function speakResponse(response) {
  exec(`espeak "${response}"`);
  console.log("[CHAT]", response);
}

module.exports = {
  getChatResponse,
  speakResponse
};

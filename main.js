const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const interpreter = require('./core/interpreter');
const memory = require('./modules/memory/short-term');

// Setup readline for keyboard input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Text-to-speech function
function speak(text) {
  console.log('🗣️ ' + text);
  exec(`espeak "${text.replace(/"/g, "'")}"`);
}

// Handle command input (from keyboard or mic)
function processInput(input) {
  if (!input || input.trim() === '') return;

  memory.update(input); // Remember what the user said

  interpreter.handle(input, (response) => {
    if (response) speak(response);
    else speak("I'm not sure how to respond to that.");
  });
}

// Listen for text input
function listenText() {
  rl.question('🧠 You: ', (input) => {
    processInput(input);
    listenText(); // Wait for next
  });
}

// Optional: Voice input loop
// (Later you can connect `mic-listener.py` for automatic mode)
listenText();

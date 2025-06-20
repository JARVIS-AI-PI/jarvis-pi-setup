const { ipcRenderer } = require('electron');

const inputBox = document.getElementById('input-box');
const sendButton = document.getElementById('send-button');
const output = document.getElementById('output');

function printOutput(text) {
  const line = document.createElement('div');
  line.innerText = "Jarvis: " + text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function speak(text) {
  ipcRenderer.send('speak-text', text);
}

function handleCommand(cmd) {
  const inputLine = document.createElement('div');
  inputLine.innerText = "You: " + cmd;
  output.appendChild(inputLine);
  output.scrollTop = output.scrollHeight;

  // Send to backend
  ipcRenderer.invoke('process-input', cmd).then(response => {
    printOutput(response);
    speak(response);
  });
}

sendButton.addEventListener('click', () => {
  const cmd = inputBox.value.trim();
  if (cmd !== '') {
    handleCommand(cmd);
    inputBox.value = '';
  }
});

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

// Handle response from mic listener (Python)
ipcRenderer.on('voice-command', (_, message) => {
  handleCommand(message);
});

// Auto greeting
window.onload = () => {
  printOutput("Hello, I am Jarvis AI. How can I assist you?");
};

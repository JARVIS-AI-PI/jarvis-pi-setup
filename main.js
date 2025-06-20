const modules = require('./modules/index.js');
const say = require('child_process').execSync;

const memory = require('./modules/memory/short-term.js');

function speak(text) {
  console.log("JARVIS:", text);
  say(`espeak "${text.replace(/"/g, '')}"`);
}

function processInput(input) {
  memory.update(input);

  let handled = false;

  for (let mod of modules) {
    if (mod && typeof mod.execute === 'function') {
      mod.execute(input, (response) => {
        if (response) speak(response);
        handled = true;
      });
    }
  }

  if (!handled) {
    speak("I'm still learning how to handle that.");
  }
}

// Sample: simulate input from command line or mic
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function prompt() {
  rl.question("You: ", (answer) => {
    processInput(answer);
    prompt();
  });
}

speak("Hello, I'm JARVIS. Ready to assist you.");
prompt();

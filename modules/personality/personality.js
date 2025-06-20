const greetings = ["Hello!", "Hi there!", "Hey!", "Good to see you!", "Howdy!"];

module.exports = {
  name: "personality",
  execute(input, say) {
    const msg = input.toLowerCase();
    if (["hi", "hello", "hey", "good morning", "good evening"].some(g => msg.includes(g))) {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      say(greeting);
    } else if (msg.includes("how are you")) {
      say("I'm functioning at full capacity! Thanks for asking.");
    } else if (msg.includes("thank you")) {
      say("You're welcome! 😊");
    }
  }
};

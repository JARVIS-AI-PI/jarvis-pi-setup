module.exports = {
  name: "logic",
  execute(input, say) {
    const msg = input.toLowerCase();
    if (msg.includes("if") && msg.includes("then")) {
      say("That sounds like a rule. Should I remember it for future use?");
    } else if (msg.includes("why") || msg.includes("how")) {
      say("Let me try to explain that logically...");
    } else {
      say("I'm processing your logic...");
    }
  }
};

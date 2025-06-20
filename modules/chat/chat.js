// modules/chat/chat.js

const fetch = require("node-fetch");

const OFFLINE_QA = {
  "what is your name": "I am Jarvis AI, your personal assistant.",
  "how are you": "I'm always online for you!",
  "who made you": "I was created by my master, powered by OpenAI-level intelligence."
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

module.exports = async function handleChat(input) {
  const text = input.toLowerCase();

  // Offline fallback
  if (!OPENAI_API_KEY) {
    return OFFLINE_QA[text] || "Sorry, I can't answer that offline.";
  }

  // Online OpenAI call
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
  } catch (err) {
    return "An error occurred while talking to the AI.";
  }
};

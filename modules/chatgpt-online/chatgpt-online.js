// modules/chatgpt-online/chatgpt-online.js

const axios = require("axios");

module.exports = {
  name: "chatgpt-online",
  description: "Query OpenAI GPT-4 or GPT-3.5 when internet is available",

  async run(args, callback) {
    const prompt = args.join(" ");
    if (!prompt) return callback("❓ Please enter a question or prompt.");

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return callback("🔑 Error: OPENAI_API_KEY is not set.");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",  // You can change to gpt-4 if you have access
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = response.data.choices[0].message.content;
      callback(reply);
    } catch (err) {
      callback("❌ Error: " + (err.response?.data?.error?.message || err.message));
    }
  }
};

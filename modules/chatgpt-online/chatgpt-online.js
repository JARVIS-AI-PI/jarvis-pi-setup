// modules/chatgpt-online/chatgpt-online.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function askChatGPT(prompt) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0].message.content.trim();
    return reply;
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    return "Sorry, I couldn't reach the AI. Check your internet or API key.";
  }
}

module.exports = {
  askChatGPT,
};

// modules/chatgpt/chatgpt-online.js
const https = require('https');

module.exports = {
  name: 'chatgpt-online',
  match: input => true, // fallback for any unmatched input
  execute: async (input, say) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      say("OpenAI API key is missing. Please set it in the environment.");
      return;
    }

    const postData = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }]
    });

    const options = {
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    };

    const req = https.request(options, res => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          const reply = response.choices?.[0]?.message?.content || "No reply from ChatGPT.";
          say(reply);
        } catch (e) {
          say("Error parsing response.");
        }
      });
    });

    req.on("error", error => {
      say("Failed to reach OpenAI servers.");
    });

    req.write(postData);
    req.end();
  }
};

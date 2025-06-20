// modules/chat/chat.js

const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "your-openai-key-here";

async function respond(input) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are Jarvis AI, an intelligent assistant." },
                    { role: "user", content: input }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const answer = response.data.choices[0].message.content.trim();
        return answer;

    } catch (err) {
        console.error("[chat module] Error:", err.message);
        return "Sorry, I couldn't process that.";
    }
}

module.exports = { respond };

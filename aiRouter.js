const axios = require("axios");
const { groqKey, model } = require("./config");
const { getHistory } = require("./memory");

async function askAI(userId, prompt) {
  try {
    const history = getHistory(userId);

    const messages = [
      {
        role: "system",
        content:
          "You are a fast, intelligent AI assistant inside a Telegram bot. Be concise, useful, and smart."
      },
      ...history,
      { role: "user", content: prompt }
    ];

    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model,
        messages,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error(err.response?.data || err.message);
    return "AI brain error ⚠️";
  }
}

module.exports = { askAI };
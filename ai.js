const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function askGroq(prompt) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a smart, fast, helpful AI assistant."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error(err.response?.data || err.message);
    return "AI error: something went wrong.";
  }
}

module.exports = { askGroq };
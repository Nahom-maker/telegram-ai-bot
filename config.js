require("dotenv").config();

module.exports = {
  groqKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile"
};
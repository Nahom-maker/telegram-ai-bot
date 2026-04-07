import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// webhook endpoint
app.post("/", async (req, res) => {
  const message = req.body.message;

  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    // simple reply
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        chat_id: chatId,
        text: "You said: " + text
      })
    });
  }

  res.sendStatus(200);
});

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Bot running...");
});
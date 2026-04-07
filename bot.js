require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { askAI } = require("./aiRouter");
const { addMessage } = require("./memory");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// START COMMAND
bot.start((ctx) => {
  ctx.reply(
    "⚡ ULTRA AI ONLINE\nSend anything and I’ll respond.",
    Markup.inlineKeyboard([
      [Markup.button.callback("🧠 Clear Memory", "clear")],
      [Markup.button.callback("⚡ Status", "status")]
    ])
  );
});

// BUTTON HANDLERS
bot.action("clear", (ctx) => {
  const userId = ctx.from.id;
  addMessage(userId, "system", "Memory reset");
  ctx.reply("🧠 Memory cleared.");
});

bot.action("status", (ctx) => {
  ctx.reply("⚡ System: ONLINE\n🧠 Brain: Breh V1\n🚀 Mode: ULTRA PRO MAX");
});

// MAIN CHAT
bot.on("text", async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  await ctx.sendChatAction("typing");

  const reply = await askAI(userId, text);

  addMessage(userId, "user", text);
  addMessage(userId, "assistant", reply);

  ctx.reply(reply);
});

bot.launch();
console.log("🚀 ULTRA BOT RUNNING");
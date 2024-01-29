import { Client, GatewayIntentBits } from "discord.js";
import mongoose from "mongoose";
import urls from "./url.js";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({length:8}).rnd()

mongoose
  .connect("mongodb://localhost:27017/shorturlservice")
  .then(() => console.log(" Connected to mongodb "))
  .catch((err) => console.log(err));

const token =
  "MTIwMTQ3MjcxNTgxOTg0NzcyMA.GCY8ev.XtKvVsOj07_nEL4K_-Tr1HzSRBy1JRqyu5IBQA";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("create")) {
    const urlfromdiscord = message.content.split("create")[1].trim();

    message.reply({
      content: "Your short url is generating ..........",
    });

    crerateurl(urlfromdiscord,uid);
    async function crerateurl(url,shortid) {
      try {
        const result = await urls.create({
          url: url,
          shorturl:shortid
        });
        message.reply({
          content: "Url inserted in database",
          content: result.shorturl.toString()
        });
        console.log(result._id);
      } catch (error) {
        console.log(error);
      }
    }

    return;
  }
  if (message.author.bot) return;
  message.reply({
    content: "Hello this is bot  here ",
  });
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(token);

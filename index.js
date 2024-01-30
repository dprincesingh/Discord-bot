import { Client, GatewayIntentBits } from "discord.js";
import mongoose from "mongoose";
import urls from "./url.js";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 8 }).rnd();

mongoose
  .connect("mongodb://localhost:27017/shorturlservice")
  .then(() => console.log(" Connected to mongodb "))
  .catch((err) => console.log(err));

const token =
  "MTIwMTQ3MjcxNTgxOTg0NzcyMA.GooRBK.Ho_lKcTEtWuWQ3LdTexBSTUY4AcDZnI-XoBhIY";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.content.startsWith("create")) {
    const urlfromdiscord = message.content.split("create")[1].trim();

   

    crerateurl(urlfromdiscord, uid);
    async function crerateurl(url, shortid) {
      try {
        const result = await urls.create({
          url: url,
          shorturl: shortid,
        });
        message.reply({
          content: "Your short url is generating ..........",
        });
        message.reply({
          content: "Url inserted in database",
          content: result.shorturl.toString(),
        });
        console.log(result._id);
      } catch (error) {
        console.log(error);
      }
    }

    return;
  }


  // reply accoring to user

  if(message.author.username=="dprincesingh"){
    message.reply({
      content:"Hi, Prince how can i help you today ? "
    })
  }

  
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(token);

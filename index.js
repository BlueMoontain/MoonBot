const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
});

// Collection = sorte de map pour stocker les commandes
client.commands = new Collection();

// Chargement automatique des fichiers dans /commands
const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once("clientReady", () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith("!") || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    client.commands.get(commandName).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Une erreur est survenue en exécutant la commande.");
  }
});
require("dotenv").config();
client.login(process.env.BOT_TOKEN);

require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection, Events } = require("discord.js");
const fs = require("fs");
const path = require("path");

// ==== Création du client ====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// ==== Command & Event Handlers ====
client.commands = new Collection();
client.events = new Collection();

// Chargement des events
const eventsPath = path.join(__dirname, "events");
fs.readdirSync(eventsPath).forEach(file => {
  if (!file.endsWith(".js")) return;
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

// Load commands
const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
}

// // Chargement des commandes (si tu en as)
// const commandsPath = path.join(__dirname, "commands");
// if (fs.existsSync(commandsPath)) {
//   fs.readdirSync(commandsPath).forEach(file => {
//     if (!file.endsWith(".js")) return;
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.data.name, command);
//   });
// }

// ==== Login ====
client.login(process.env.BOT_TOKEN)
  .then(() => console.log("🔑 Bot connecté"))
  .catch(err => console.error("Erreur login:", err));




// const { Client, GatewayIntentBits, Collection } = require("discord.js");
// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMessageReactions,
//   ],
//   partials: [Partials.Message, Partials.Channel, Partials.Reaction],
// });

// client.commands = new Collection();

// // Load commands
// const commandsPath = path.join(__dirname, "commands");
// if (fs.existsSync(commandsPath)) {
//   const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));
//   for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
//   }
// }

// // Load events
// const eventsPath = path.join(__dirname, "events");
// if (fs.existsSync(eventsPath)) {
//   const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));
//   for (const file of eventFiles) {
//     const event = require(`./events/${file}`);
//     if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
//     else client.on(event.name, (...args) => event.execute(client, ...args));
//   }
// }

// client.login(process.env.BOT_TOKEN);

// const { Client, GatewayIntentBits, Collection } = require("discord.js");
// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMessageReactions,
//   ],
// });

// client.commands = new Collection();

// // Load commands
// const commandsPath = path.join(__dirname, "commands");
// if (fs.existsSync(commandsPath)) {
//   const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));
//   for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
//   }
// }

// // Load events
// const eventsPath = path.join(__dirname, "events");
// if (fs.existsSync(eventsPath)) {
//   const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));
//   for (const file of eventFiles) {
//     const event = require(`./events/${file}`);
//     if (event.once) {
//       client.once(event.name, (...args) => event.execute(client, ...args));
//     } else {
//       client.on(event.name, (...args) => event.execute(client, ...args));
//     }
//   }
// }

// client.login(process.env.BOT_TOKEN);



// const { Client, GatewayIntentBits, Collection } = require("discord.js");
// const fs = require("fs");
// const path = require("path");
// const { handlePronounsReaction, handleButton } = require("./utils/roles");
// require("dotenv").config();

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds, 
//     GatewayIntentBits.GuildMessages, 
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMessageReactions,
//   ],
// });

// // Collection = sorte de map pour stocker les commandes
// client.commands = new Collection();

// // Chargement automatique des fichiers dans /commands
// const commandsPath = path.join(__dirname, "commands");
// if (fs.existsSync(commandsPath)) {
//   const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
//   for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
//   }
// }

// client.once("clientReady", () => {
//   console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
// });

// client.on("messageCreate", (message) => {
//   if (!message.content.startsWith("!") || message.author.bot) return;

//   const args = message.content.slice(1).split(/ +/);
//   const commandName = args.shift().toLowerCase();

//   if (!client.commands.has(commandName)) return;

//   try {
//     client.commands.get(commandName).execute(message, args);
//   } catch (error) {
//     console.error(error);
//     message.reply("❌ Une erreur est survenue en exécutant la commande.");
//   }
// });

// // Gestion des réactions pour les pronoms
// client.on("messageReactionAdd", async (reaction, user) => {
//   if (user.bot) return;
//   handlePronounsReaction(reaction, user, true);
// });

// client.on("messageReactionRemove", async (reaction, user) => {
//   if (user.bot) return;
//   handlePronounsReaction(reaction, user, false);
// });

// // Gestion des boutons pour continents et zodiac
// client.on("interactionCreate", async interaction => {
//   if (!interaction.isButton()) return;
//   handleButton(interaction);
// });


// client.login(process.env.BOT_TOKEN);

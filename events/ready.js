// events/ready.js
const {
  pronounsMessage,
  zodiacMessage,
  continentsMessage,
} = require("../config/messages.json");

const {
  pronounsMap,
  zodiacMap,
  continentsMap,
} = require("../utils/roles");
const { startReminderScheduler } = require("../scheduler/reminderScheduler");
const { buildReminderMenu } = require("../utils/ReminderMenu");

module.exports = {
  name: "clientReady",
  once: true,
  async execute(client) {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
    setTimeout(() => {
      startReminderScheduler(client);
    }, 10000);
    console.log("DEBUG continentsMap:", continentsMap);
    console.log("DEBUG roles import:", require("../utils/roles"));
    

    for (const guild of client.guilds.cache.values()) {
      const channel = guild.channels.cache.find(
        c => c.name === "getroles" && c.isTextBased()
      );
      if (!channel) {
        console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
        continue;
      }

      // ===== Pronoms =====
      let messages = await channel.messages.fetch({ limit: 50 });
      let pronounsMsg = messages.find(m => m.content === pronounsMessage.content);
      if (!pronounsMsg) {
        pronounsMsg = await channel.send({ content: pronounsMessage.content });
        console.log(`[LOG] Message pronoms créé dans ${guild.name}`);
      }

      await pronounsMsg.fetch(); // fetch toutes les réactions existantes
      for (const emoji of Object.keys(pronounsMap)) {
        if (!pronounsMsg.reactions.cache.has(emoji)) {
          await pronounsMsg.react(emoji);
        }
      }
      console.log("MESSAGES TROUVÉS:", messages.map(m => m.content));
      // ===== Zodiac =====
      let zodiacMsg = messages.find(m => m.content === zodiacMessage.content);
      if (!zodiacMsg) {
        zodiacMsg = await channel.send({ content: zodiacMessage.content });
        console.log(`[LOG] Message zodiac créé dans ${guild.name}`);
      }

      await zodiacMsg.fetch(); // fetch toutes les réactions existantes
      // if (zodiacMsg) await zodiacMsg.pin();

      for (const emoji of Object.keys(zodiacMap)) {
        if (!zodiacMsg.reactions.cache.has(emoji)) {
          await zodiacMsg.react(emoji);
        }
      }
      // ===== Continents =====
let continentsMsg = messages.find(m => m.content === continentsMessage.content);

if (!continentsMsg) {
  continentsMsg = await channel.send({ content: continentsMessage.content });
  console.log(`[LOG] Message continents créé dans ${guild.name}`);
}

await continentsMsg.fetch();

for (const emoji of Object.keys(continentsMap)) {
  const roleExists = guild.roles.cache.find(r => r.name === continentsMap[emoji]);
  if (!roleExists) {
    console.warn(`⚠️ Le rôle ${continentsMap[emoji]} n'existe pas dans ${guild.name}`);
    continue;
  }

  if (!continentsMsg.reactions.cache.has(emoji)) {
    await continentsMsg.react(emoji);
  }
}
// ===== Reminder Channel =====
const reminderMessages = await channel.messages.fetch({ limit: 20 });

let reminderMsg = reminderMessages.find(
  m =>
    m.author.id === client.user.id &&
    m.components.length > 0
);

if (!reminderMsg) {

  const reminderMenu = buildReminderMenu();

  reminderMsg = await channel.send({
    content: "⏰ Select your active reminder times (UTC):",
    components: reminderMenu
  });

  console.log(`[LOG] Message reminders créé dans ${guild.name}`);
}
    }

  },
};


// // events/ready.js
// const { pronounsMessage, zodiacMessage } = require("../config/messages.json");
// const { pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

//     for (const guild of client.guilds.cache.values()) {
//       const channel = guild.channels.cache.find(c => c.name === "getroles" && c.isTextBased());
//       if (!channel) {
//         console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
//         continue;
//       }

//       // ===== Pronoms =====
//       let pronounsMsg = channel.messages.cache.find(m => m.content === pronounsMessage.content);
//       if (!pronounsMsg) {
//         pronounsMsg = await channel.send({ content: pronounsMessage.content });
//         console.log(`[LOG] Message pronoms créé dans ${guild.name}`);
//       }

//       for (const emoji of Object.keys(pronounsMap)) {
//         if (!pronounsMsg.reactions.cache.has(emoji)) await pronounsMsg.react(emoji);
//       }

//       // ===== Zodiac =====
//       let zodiacMsg = channel.messages.cache.find(m => m.content === zodiacMessage.content);
//       if (!zodiacMsg) {
//         zodiacMsg = await channel.send({ content: zodiacMessage.content });
//         await zodiacMsg.pin();
//         console.log(`[LOG] Message zodiac créé et épinglé dans ${guild.name}`);
//       }

//       for (const emoji of Object.keys(zodiacMap)) {
//         if (!zodiacMsg.reactions.cache.has(emoji)) await zodiacMsg.react(emoji);
//       }
//     }
//   },
// };


// // events/ready.js
// const { pronounsMessage, zodiacMessage } = require("../config/messages.json");
// const { pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

//     for (const guild of client.guilds.cache.values()) {
//       const channel = guild.channels.cache.find(c => c.name === "getroles" && c.isTextBased());
//       if (!channel) {
//         console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
//         continue;
//       }
// // ===== Pronoms =====
// let pronounsMsg = channel.messages.cache.find(m => m.content === pronounsMessage.content);
// if (!pronounsMsg) pronounsMsg = await channel.send({ content: pronounsMessage.content });

// for (const emoji of Object.keys(pronounsMap)) {
//   const roleExists = guild.roles.cache.find(r => r.name === pronounsMap[emoji]);
//   if (!roleExists) {
//     console.warn(`⚠️ Le rôle ${pronounsMap[emoji]} n'existe pas dans ${guild.name}`);
//     continue;
//   }
//   if (!pronounsMsg.reactions.cache.has(emoji)) await pronounsMsg.react(emoji);
// }

// // ===== Zodiac =====
// let zodiacMsg = channel.messages.cache.find(m => m.content === zodiacMessage.content);
// if (!zodiacMsg) zodiacMsg = await channel.send({ content: zodiacMessage.content });
// if (zodiacMsg) await zodiacMsg.pin();

// for (const emoji of Object.keys(zodiacMap)) {
//   const roleExists = guild.roles.cache.find(r => r.name === zodiacMap[emoji]);
//   if (!roleExists) {
//     console.warn(`⚠️ Le rôle ${zodiacMap[emoji]} n'existe pas dans ${guild.name}`);
//     continue;
//   }
//   if (!zodiacMsg.reactions.cache.has(emoji)) await zodiacMsg.react(emoji);
// }

//       // ===== Pronoms =====
//       let pronounsMsg = channel.messages.cache.find(m => m.content === pronounsMessage);
//       if (!pronounsMsg) pronounsMsg = await channel.send(pronounsMessage);

//       for (const emoji of Object.keys(pronounsMap)) {
//         const roleExists = guild.roles.cache.find(r => r.name === pronounsMap[emoji]);
//         if (!roleExists) {
//           console.warn(`⚠️ Le rôle ${pronounsMap[emoji]} n'existe pas dans ${guild.name}`);
//           continue;
//         }
//         if (!pronounsMsg.reactions.cache.has(emoji)) await pronounsMsg.react(emoji);
//       }

//       // ===== Zodiac =====
//       let zodiacMsg = channel.messages.cache.find(m => m.content === zodiacMessage);
//       if (!zodiacMsg) zodiacMsg = await channel.send(zodiacMessage);
//       if (zodiacMsg) await zodiacMsg.pin();

//       for (const emoji of Object.keys(zodiacMap)) {
//       const roleExists = guild.roles.cache.find(r => r.name === zodiacMap[emoji]);
//       if (!roleExists) {
//       console.warn(`⚠️ Le rôle ${zodiacMap[emoji]} n'existe pas dans ${guild.name}`);
//       continue;
//   }
//   await zodiacMsg.react(emoji);
// }

      // for (const emoji of Object.keys(zodiacMap)) {
      //   const roleExists = guild.roles.cache.find(r => r.name === zodiacMap[emoji]);
      //   if (!roleExists) {
      //     console.warn(`⚠️ Le rôle ${zodiacMap[emoji]} n'existe pas dans ${guild.name}`);
      //     continue;
      //   }
      //   if (!zodiacMsg.reactions.cache.has(emoji)) await zodiacMsg.react(emoji);
      // }
//     }

//     console.log("🎉 Ready event terminé, messages de rôles envoyés et emojis ajoutés");
//   },
// };



// // events/ready.js
// const { pronounsMessage, zodiacMessage } = require("../config/messages.json");
// const { pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

//     for (const guild of client.guilds.cache.values()) {
//       // Cherche le salon #getroles
//       const channel = guild.channels.cache.find(c => c.name === "getroles" && c.isTextBased());
//       if (!channel) {
//         console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
//         continue;
//       }

//       // ===== Pronoms =====
//       const pronounsMsg = await channel.send(pronounsMessage);
//       for (const emoji of Object.keys(pronounsMap)) {
//         const roleExists = guild.roles.cache.find(r => r.name === pronounsMap[emoji]);
//         if (!roleExists) {
//           console.warn(`⚠️ Le rôle ${pronounsMap[emoji]} n'existe pas dans ${guild.name}`);
//           continue;
//         }
//         await pronounsMsg.react(emoji);
//       }

//       // ===== Zodiac =====
//       const zodiacMsg = await channel.send(zodiacMessage);
//       if (zodiacMsg) await zodiacMsg.pin();
//       for (const emoji of Object.keys(zodiacMap)) {
//         const roleExists = guild.roles.cache.find(r => r.name === zodiacMap[emoji]);
//         if (!roleExists) {
//           console.warn(`⚠️ Le rôle ${zodiacMap[emoji]} n'existe pas dans ${guild.name}`);
//           continue;
//         }
//         await zodiacMsg.react(emoji);
//       }
//     }

//     console.log("🎉 Ready event terminé, messages de rôles envoyés et emojis ajoutés");
//   },
// };


// // events/ready.js
// const { pronounsMessage, zodiacMessage } = require("../config/messages.json");
// const { pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

//     for (const guild of client.guilds.cache.values()) {
//       // Cherche le salon #getroles
//       const channel = guild.channels.cache.find(c => c.name === "getroles" && c.isTextBased());
//       if (!channel) {
//         console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
//         continue;
//       }

//       // ===== Pronoms =====
//       const pronounsMsg = await channel.send(pronounsMessage);

//       for (const emoji of Object.keys(pronounsMap)) {
//         let role = guild.roles.cache.find(r => r.name === pronounsMap[emoji]);

//         // Création du rôle s'il n'existe pas
//         if (!role) {
//           try {
//             role = await guild.roles.create({
//               name: pronounsMap[emoji],
//               color: "Random", // tu peux mettre une couleur fixe si tu veux
//               reason: "Role automatique pour pronoms"
//             });
//             console.log(`✅ Rôle créé: ${role.name} dans ${guild.name}`);
//           } catch (err) {
//             console.error(`❌ Impossible de créer le rôle ${pronounsMap[emoji]}:`, err);
//             continue;
//           }
//         }

//         await pronounsMsg.react(emoji);
//       }

//       // ===== Zodiac =====
//       const zodiacMsg = await channel.send(zodiacMessage);
//       if (zodiacMsg) await zodiacMsg.pin();

//       for (const emoji of Object.keys(zodiacMap)) {
//         let role = guild.roles.cache.find(r => r.name === zodiacMap[emoji]);

//         // Création du rôle s'il n'existe pas
//         if (!role) {
//           try {
//             role = await guild.roles.create({
//               name: zodiacMap[emoji],
//               color: "Random",
//               reason: "Role automatique pour zodiac"
//             });
//             console.log(`✅ Rôle créé: ${role.name} dans ${guild.name}`);
//           } catch (err) {
//             console.error(`❌ Impossible de créer le rôle ${zodiacMap[emoji]}:`, err);
//             continue;
//           }
//         }

//         await zodiacMsg.react(emoji);
//       }
//     }

//     console.log("🎉 Ready event terminé, messages de rôles envoyés et emojis ajoutés");
//   }
// };


// const { pronounsMessage, zodiacMessage } = require("../config/messages.json");
// const { zodiacMap, pronounsMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

//     for (const guild of client.guilds.cache.values()) {
//       // Cherche le salon #getroles
//       const channel = guild.channels.cache.find(c => c.name === "getroles" && c.isTextBased());
//       if (!channel) {
//         console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
//         continue;
//       }

//       // ===== Pronoms =====
//       const pronounsMsg = await channel.send(pronounsMessage);

//       for (const emoji of Object.keys(pronounsMap)) {
//         const roleExists = guild.roles.cache.find(r => r.name === pronounsMap[emoji]);
//         if (!roleExists) {
//           console.warn(`⚠️ Le rôle ${pronounsMap[emoji]} n'existe pas dans ${guild.name}`);
//           continue;
//         }
//         await pronounsMsg.react(emoji);
//       }

//       // ===== Zodiac (via emojis) =====
//       const zodiacMsg = await channel.send(zodiacMessage);
//       if (zodiacMsg) await zodiacMsg.pin();

//       for (const emoji of Object.keys(zodiacMap)) {
//         const roleExists = guild.roles.cache.find(r => r.name === zodiacMap[emoji]);
//         if (!roleExists) {
//           console.warn(`⚠️ Le rôle ${zodiacMap[emoji]} n'existe pas dans ${guild.name}`);
//           continue;
//         }
//         await zodiacMsg.react(emoji);
//       }
//     }

//     console.log("🎉 Ready event terminé, messages de rôles envoyés et emojis ajoutés");
//   }
// };



// // events/ready.js
// const { pronounsMessage, continentsMessage, zodiacMessage } = require("../config/messages.json");
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
// const { zodiacMap, continentsMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

//     client.guilds.cache.forEach(async guild => {
//       // Cherche le salon #getroles
//       const channel = guild.channels.cache.find(c => c.name === "getroles" && c.isTextBased());
//       if (!channel) {
//         console.warn(`⚠️ Pas de salon #getroles trouvé dans ${guild.name}`);
//         return;
//       }

//       // ===== Pronoms =====
//       const pronounsMsg = await channel.send(pronounsMessage);
//       await pronounsMsg.react("💛");
//       await pronounsMsg.react("💚");
//       await pronounsMsg.react("💜");

//       // ===== Continents =====
//       const continentRow = new ActionRowBuilder().addComponents(
//         Object.keys(continentsMap).map(key =>
//           new ButtonBuilder()
//             .setCustomId(key)
//             .setLabel(continentsMap[key])
//             .setStyle(ButtonStyle.Primary)
//         )
//       );
//       await channel.send({ content: continentsMessage, components: [continentRow] });

//       // ===== Zodiac (via emojis) =====
//       const zodiacMsg = await channel.send(zodiacMessage);
//       if (zodiacMsg) await zodiacMsg.pin();

//       for (const emoji of Object.keys(zodiacMap)) {
//         await zodiacMsg.react(emoji);
//       }
//     });
//   }
// };


// // // events/ready.js
// const { pronounsMessage, continentsMessage, zodiacMessage } = require("../config/messages.json");
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
// const { zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connected as ${client.user.tag}`);

//     client.guilds.cache.forEach(async guild => {
//       // Vérifie qu'un salon existe
//       const channel = guild.systemChannel;
//       if (!channel) return;

//       // Pronouns message
//       const pronounsMsg = await channel.send(pronounsMessage);
//       if (pronounsMsg) await pronounsMsg.pin();
//       await pronounsMsg?.react("💛");
//       await pronounsMsg?.react("💚");
//       await pronounsMsg?.react("💜");

//       // Continents message
//       const row = new ActionRowBuilder().addComponents(
//         new ButtonBuilder().setCustomId("africa").setLabel("Africa").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("asia").setLabel("Asia").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("europe").setLabel("Europe").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("america").setLabel("America").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("oceania").setLabel("Oceania").setStyle(ButtonStyle.Primary)
//       );
//       const continentsMsg = await channel.send({ content: continentsMessage, components: [row] });
//       if (continentsMsg) await continentsMsg.pin();

//       // Zodiac message
//       const zodiacRow = new ActionRowBuilder();
//       Object.keys(zodiacMap).forEach(sign => {
//         zodiacRow.addComponents(
//           new ButtonBuilder()
//             .setCustomId(sign)
//             .setLabel(sign.charAt(0).toUpperCase() + sign.slice(1))
//             .setStyle(ButtonStyle.Primary)
//         );
//       });
//       const zodiacMsg = await channel.send({ content: zodiacMessage, components: [zodiacRow] });
//       if (zodiacMsg) await zodiacMsg.pin();
//     });
//   }
// };


// const { pronounsMessage, continentsMessage, zodiacMessage } = require("../config/messages.json");
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

// module.exports = {
//   name: "clientReady",
//   once: true,
//   async execute(client) {
//     console.log(`✅ Bot connected as ${client.user.tag}`);

//     client.guilds.cache.forEach(async guild => {
//       // Pronouns message
//       const pronounsMsg = await guild.systemChannel?.send(pronounsMessage);
//       if (pronounsMsg) await pronounsMsg.pin();
//       await pronounsMsg?.react("💛");
//       await pronounsMsg?.react("💚");
//       await pronounsMsg?.react("💜");

//       // Continents message
//       const row = new ActionRowBuilder().addComponents(
//         new ButtonBuilder().setCustomId("africa").setLabel("Africa").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("asia").setLabel("Asia").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("europe").setLabel("Europe").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("america").setLabel("America").setStyle(ButtonStyle.Primary),
//         new ButtonBuilder().setCustomId("oceania").setLabel("Oceania").setStyle(ButtonStyle.Primary)
//       );
//       const continentsMsg = await guild.systemChannel?.send({ content: continentsMessage, components: [row] });
//       if (continentsMsg) await continentsMsg.pin();

//       // Zodiac message
//       const zodiacRow = new ActionRowBuilder();
//       Object.keys(require("../utils/roles").zodiacMap).forEach(sign => {
//         zodiacRow.addComponents(
//           new ButtonBuilder().setCustomId(sign).setLabel(sign.charAt(0).toUpperCase() + sign.slice(1)).setStyle(ButtonStyle.Primary)
//         );
//       });
//       const zodiacMsg = await guild.systemChannel?.send({ content: zodiacMessage, components: [zodiacRow] });
//       if (zodiacMsg) await zodiacMsg.pin();
//     });
//   }
// };

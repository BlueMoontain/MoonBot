const { pronounsMap, zodiacMap, continentsMap } = require("../utils/roles");

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user) {
    if (user.bot) return;

    try {
      if (reaction.partial) await reaction.fetch();

      const emoji = reaction.emoji.name;
      const member = await reaction.message.guild.members.fetch(user.id);

      // ===== Pronouns =====
      if (pronounsMap[emoji]) {
        const roleName = pronounsMap[emoji];
        const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);

        if (role && member.roles.cache.has(role.id)) {
          await member.roles.remove(role);
          console.log(`❌ Retiré ${roleName} de ${member.user.tag}`);
        }
        return;
      }
// ===== Continents =====
if (continentsMap[emoji]) {
  const roleName = continentsMap[emoji];
  const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);

  if (role && member.roles.cache.has(role.id)) {
    await member.roles.remove(role);
    console.log(`🌍 Retiré ${roleName} de ${member.user.tag}`);
  }

  return;
}
      // ===== Zodiac =====
      if (zodiacMap[emoji]) {
        const roleName = zodiacMap[emoji];
        const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);

        if (role && member.roles.cache.has(role.id)) {
          await member.roles.remove(role);
          console.log(`🌓 ${member.user.tag} n’a plus de signe (${roleName} retiré)`);
        }
      }
    } catch (err) {
      console.error("❌ Erreur MessageReactionRemove:", err);
    }
  },
};


// // events/messageReactionRemove.js
// const { pronounsMap, zodiacMap, handlePronounsReaction, handleZodiacReaction } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionRemove",
//   async execute(reaction, user) {
//     if (user.bot) return; // Ignore les bots

//     const emoji = reaction.emoji.name;

//     // Vérifie si l'emoji correspond à un pronom
//     if (pronounsMap[emoji]) {
//       await handlePronounsReaction(reaction, user, false);
//     }

//     // Vérifie si l'emoji correspond à un signe du zodiaque
//     if (zodiacMap[emoji]) {
//       await handleZodiacReaction(reaction, user, false);
//     }
//   }
// };


// // events/messageReactionRemove.js
// const { handlePronounsReaction, pronounsMap } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionRemove",
//   async execute(reaction, user) {
//     if (user.bot) return;

//     try {
//       if (reaction.partial) await reaction.fetch();

//       if (!reaction.message.guild || !reaction.message.channel.name.includes("getroles") || !reaction.message.author.bot) return;

//       const emoji = reaction.emoji.name;

//       if (pronounsMap[emoji]) await handlePronounsReaction(reaction, user, false);
//       // Zodiac → pas de suppression via remove, un seul rôle est actif
//     } catch (err) {
//       console.error("Erreur MessageReactionRemove:", err);
//     }
//   },
// };



// // events/messageReactionRemove.js
// const { handlePronounsReaction, pronounsMap } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionRemove",
//   async execute(reaction, user) {
//     if (user.bot) return;

//     try {
//       if (reaction.partial) await reaction.fetch();

//       const emoji = reaction.emoji.name;

//       if (pronounsMap[emoji]) {
//         await handlePronounsReaction(reaction, user, false);
//       }
//       // Pas de suppression zodiac via emoji remove pour le moment
//     } catch (err) {
//       console.error("Erreur MessageReactionRemove:", err);
//     }
//   },
// };


// const { handlePronounsReaction, handleZodiacReaction, pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionRemove",
//   async execute(reaction, user) {
//     if (user.bot) return;

//     try {
//       if (reaction.partial) await reaction.fetch();

//       const emoji = reaction.emoji.name;

//       if (pronounsMap[emoji]) {
//         await handlePronounsReaction(reaction, user, false);
//       } else if (zodiacMap[emoji]) {
//         await handleZodiacReaction(reaction, user, false); // add=false pour suppression
//       }
//     } catch (err) {
//       console.error("Erreur MessageReactionRemove:", err);
//     }
//   },
// };

// const { handlePronounsReaction } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionRemove",
//   execute: (client, reaction, user) => {
//     if (user.bot) return;
//     handlePronounsReaction(reaction, user, false);
//   }
// };


// const { handlePronounsReaction } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionRemove",
//   async execute(client, reaction, user) { if (user.bot) return; handlePronounsReaction(reaction, user, false); }
// };

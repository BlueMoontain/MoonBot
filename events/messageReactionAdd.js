const { pronounsMap, zodiacMap, continentsMap } = require("../utils/roles");

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user)
   {console.log(
  "🔥 Reaction detected:",
  reaction.emoji.name,
  "in",
  reaction.message.channel.name,
  
);console.log(
  reaction.message.guild.roles.cache.map(
    r => r.name
  )
);
console.log(
  reaction.message.guild.roles.cache.map(
    r => `"${r.name}"`
  )
);
    if (user.bot) return;

    try {
      if (reaction.partial) await reaction.fetch();

      const emoji = reaction.emoji.name;
      const member = await reaction.message.guild.members.fetch(user.id);
      await member.fetch(true);

// ===== Rules Verification =====

if (
  reaction.message.channel.name ===
    "rules-📘" &&
  emoji === "✅"
) {

  // const verifiedRole =
  //   reaction.message.guild.roles.cache.find(
  //     r => r.name === "Verified ✅"
  //   );

  console.log("=== ROLES ===");

guild.roles.cache.forEach(role => {
  console.log(`[${role.name}]`);
});

const verifiedRole =
  guild.roles.cache.find(
    r => r.name.includes("Verified")
  );

console.log("Verified trouvé :", verifiedRole?.name);

  // const challengerRole =
  //   reaction.message.guild.roles.cache.find(
  //     r =>
  //       r.name ===
  //       "Art Challengers ✏️✨️"
  //   );

  const artRole =
  guild.roles.cache.find(
    r => r.name.includes("Art Challengers")
  );

console.log("Art trouvé :", artRole?.name);

  if (
    !verifiedRole ||
    !challengerRole
  ) {

    console.warn(
      "⚠️ Verification roles not found"
    );

    return;
  }

  if (
    !member.roles.cache.has(
      verifiedRole.id
    )
  ) {

    await member.roles.add([
      verifiedRole,
      challengerRole
    ]);

    console.log(
      `🦇 ${member.user.tag} entered Botstarion's domain`
    );
  }

  return;
}

      // ===== Pronouns =====
      if (pronounsMap[emoji]) {
        const roleName = pronounsMap[emoji];
        const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);

        if (!role) {
          console.warn(`⚠️ Rôle ${roleName} introuvable pour ${emoji}`);
          return;
        }

        if (!member.roles.cache.has(role.id)) {
          await member.roles.add(role);
          console.log(`✅ Ajouté ${roleName} à ${member.user.tag}`);
        }
        return;
      }
      // ===== Continents =====
if (continentsMap[emoji]) {
  const roleName = continentsMap[emoji];
  const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);

  if (!role) {
    console.warn(`⚠️ Rôle ${roleName} introuvable pour ${emoji}`);
    return;
  }

  if (!member.roles.cache.has(role.id)) {
    await member.roles.add(role);
    console.log(`🌍 Ajouté ${roleName} à ${member.user.tag}`);
  }

  return;
}

      // ===== Zodiac =====
      if (zodiacMap[emoji]) {
        const newRoleName = zodiacMap[emoji];
        const newRole = reaction.message.guild.roles.cache.find(r => r.name === newRoleName);

        if (!newRole) {
          console.warn(`⚠️ Rôle ${newRoleName} introuvable pour ${emoji}`);
          return;
        }

        // --- Supprimer tous les anciens rôles zodiac ---
        const zodiacRoles = Object.values(zodiacMap);
        const oldRoles = member.roles.cache.filter(r => zodiacRoles.includes(r.name));
        if (oldRoles.size > 0) {
          await member.roles.remove(oldRoles);
        }

        // --- Retirer toutes les autres réactions zodiac de cet utilisateur ---
        const zodiacReactions = reaction.message.reactions.cache.filter(r => zodiacMap[r.emoji.name]);
        for (const r of zodiacReactions.values()) {
          if (r.emoji.name !== emoji) {
        
            await r.users.fetch();
        
            if (r.users.cache.has(user.id)) {
              await r.users.remove(user.id);
            }
          }
        }

        // --- Ajouter le nouveau rôle ---
        await member.roles.add(newRole);
        console.log(`🌟 ${member.user.tag} est maintenant ${newRoleName}`);
      }
    } catch (err) {
      console.error("❌ Erreur MessageReactionAdd:", err);
    }
  },
  
};


// // events/messageReactionAdd.js
// const { pronounsMap, zodiacMap, handlePronounsReaction, handleZodiacReaction } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionAdd",
//   async execute(reaction, user) {
//     if (user.bot) return; // Ignore les bots

//     const emoji = reaction.emoji.name;

//     // Vérifie si l'emoji correspond à un pronom
//     if (pronounsMap[emoji]) {
//       await handlePronounsReaction(reaction, user, true);
//     }

//     // Vérifie si l'emoji correspond à un signe du zodiaque
//     if (zodiacMap[emoji]) {
//       await handleZodiacReaction(reaction, user, true);
//     }
//   }
// };


// // events/messageReactionAdd.js
// const { handlePronounsReaction, handleZodiacReaction, pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionAdd",
//   async execute(reaction, user) {
//     if (user.bot) return;

//     try {
//       if (reaction.partial) await reaction.fetch();

//       // Filtrage strict → uniquement les messages bot du salon #getroles
//       if (!reaction.message.guild || !reaction.message.channel.name.includes("getroles") || !reaction.message.author.bot) return;

//       const emoji = reaction.emoji.name;

//       // Bloquer les réactions non valides
//       if (!pronounsMap[emoji] && !zodiacMap[emoji]) {
//         await reaction.users.remove(user.id);
//         return;
//       }

//       if (pronounsMap[emoji]) await handlePronounsReaction(reaction, user, true);
//       else if (zodiacMap[emoji]) await handleZodiacReaction(reaction, user, true);
//     } catch (err) {
//       console.error("Erreur MessageReactionAdd:", err);
//     }
//   },
// };


// // events/messageReactionAdd.js
// const { handlePronounsReaction, handleZodiacReaction, pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionAdd",
//   async execute(reaction, user) {
//     if (user.bot) return;

//     try {
//       if (reaction.partial) await reaction.fetch();

//       const emoji = reaction.emoji.name;

//       if (pronounsMap[emoji]) {
//         await handlePronounsReaction(reaction, user, true);
//       } else if (zodiacMap[emoji]) {
//         await handleZodiacReaction(reaction, user, true);
//       }
//     } catch (err) {
//       console.error("Erreur MessageReactionAdd:", err);
//     }
//   },
// };



// const { handlePronounsReaction, handleZodiacReaction, pronounsMap, zodiacMap } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionAdd",
//   async execute(reaction, user) {
//     if (user.bot) return;

//     try {
//       if (reaction.partial) await reaction.fetch();

//       const emoji = reaction.emoji.name;

//       if (pronounsMap[emoji]) {
//         await handlePronounsReaction(reaction, user, true);
//       } else if (zodiacMap[emoji]) {
//         await handleZodiacReaction(reaction, user, true); // add=true pour ajout
//       }
//     } catch (err) {
//       console.error("Erreur MessageReactionAdd:", err);
//     }
//   },
// };


// const { handlePronounsReaction } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionAdd",
//   execute: (client, reaction, user) => {
//     if (user.bot) return;
//     handlePronounsReaction(reaction, user, true);
//   }
// };

// const { handlePronounsReaction } = require("../utils/roles");

// module.exports = {
//   name: "messageReactionAdd",
//   async execute(client, reaction, user) { if (user.bot) return; handlePronounsReaction(reaction, user, true); }
// };

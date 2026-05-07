console.log("🚨 ROLES FILE VERSION CLEAN");
// const {
//   resetReminderCache
// } = require("../scheduler/reminderScheduler");
// ===== Pronoms =====
const pronounsMap = {
  "💛": "She/Her",
  "💚": "He/Him",
  "💜": "They/Them",
  "🧡": "Any Pronouns",
  "💙": "Ask Me"
};

// ===== Zodiac =====
const zodiacMap = {
  "♈": "Aries",
  "♉": "Taurus",
  "♊": "Gemini",
  "♋": "Cancer",
  "♌": "Leo",
  "♍": "Virgo",
  "♎": "Libra",
  "♏": "Scorpio",
  "♐": "Sagittarius",
  "♑": "Capricorn",
  "♒": "Aquarius",
  "♓": "Pisces"
};

// ===== Continents =====
const continentsMap = {
  "🦁": "Africa",
  "🐘": "Asia",
  "🦅": "North America",
  "🐺": "Europe",
  "🦜": "South America",
  "🐨": "Oceania",
  "🐧": "Antarctica"
};

const remindersMap = {
  "12 AM": "Reminder 12 AM UTC",
  "2 AM": "Reminder 2 AM UTC",
  "4 AM": "Reminder 4 AM UTC",
  "6 AM": "Reminder 6 AM UTC",
  "8 AM": "Reminder 8 AM UTC",
  "10 AM": "Reminder 10 AM UTC",
  "12 PM": "Reminder 12 PM UTC",
  "2 PM": "Reminder 2 PM UTC",
  "4 PM": "Reminder 4 PM UTC",
  "6 PM": "Reminder 6 PM UTC",
  "8 PM": "Reminder 8 PM UTC",
  "10 PM": "Reminder 10 PM UTC",
};

// ===== Pronouns handler =====
async function handlePronounsReaction(reaction, user, add) {
  const roleName = pronounsMap[reaction.emoji.name];
  if (!roleName) return;

  const member = await reaction.message.guild.members.fetch(user.id);
  const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
  if (!role) return;

  if (add) await member.roles.add(role);
  else await member.roles.remove(role);
}

// ===== Zodiac handler =====
const zodiacLocks = new Map();

async function handleZodiacReaction(reaction, user, add) {
  const member = await reaction.message.guild.members.fetch(user.id);
  const emoji = reaction.emoji.name;

  const newRoleName = zodiacMap[emoji];
  if (!newRoleName) return;

  const newRole = reaction.message.guild.roles.cache.find(r => r.name === newRoleName);
  if (!newRole) return;

  if (zodiacLocks.get(user.id)) return;
  zodiacLocks.set(user.id, true);

  try {
    if (add) {
      for (const key of Object.keys(zodiacMap)) {
        const oldRole = reaction.message.guild.roles.cache.find(r => r.name === zodiacMap[key]);
        if (oldRole && member.roles.cache.has(oldRole.id)) {
          await member.roles.remove(oldRole);
        }
      }

      await member.roles.add(newRole);
    } else {
      if (member.roles.cache.has(newRole.id)) {
        await member.roles.remove(newRole);
      }
    }
  } finally {
    zodiacLocks.delete(user.id);
  }
}
// ===== Reminder Dropdown =====
async function handleReminderSelect(interaction) {

  // const member = interaction.member;
  const member = await interaction.guild.members.fetch(interaction.user.id);
  const guild = interaction.guild;

  if (!member || !guild) return;

  const selectedTimes = interaction.values;

  try {

    // ===== Supprimer anciens rôles reminders =====
    for (const roleName of Object.values(remindersMap)) {

      const role = guild.roles.cache.find(
        r => r.name === roleName
      );

      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }

    // ===== Ajouter nouveaux rôles reminders =====
    for (const time of selectedTimes) {

      const roleName = remindersMap[time];

      const role = guild.roles.cache.find(
        r => r.name === roleName
      );

      if (!role) {
        console.warn(`⚠️ Rôle reminder introuvable : ${roleName}`);
        continue;
      }
      await member.roles.add(role);
    }

    // ===== Confirmation utilisateur =====
    const formatted =
      selectedTimes.length > 0
        ? selectedTimes.map(t => `${t} UTC`).join(", ")
        : "None";

    await interaction.reply({
      content: `✅ Active reminders: ${formatted}`,
      ephemeral: true
    });

  } catch (err) {

    console.error("❌ Reminder dropdown error:", err);

    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Error while updating reminders.",
        ephemeral: true
      });
    }
  }
}

// ===== Clear Reminders =====
async function handleClearReminders(interaction) {

  const member = interaction.member;
  const guild = interaction.guild;

  if (!member || !guild) return;

  try {

    for (const roleName of Object.values(remindersMap)) {

      const role = guild.roles.cache.find(
        r => r.name === roleName
      );

      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }

    await interaction.reply({
      content: "✅ All reminders cleared.",
      ephemeral: true
    });

  } catch (err) {

    console.error("❌ Clear reminders error:", err);

    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Error while clearing reminders.",
        ephemeral: true
      });
    }
  }
}
// ===== EXPORT (propre, unique, en bas) =====
module.exports = {
  pronounsMap,
  zodiacMap,
  continentsMap,
  remindersMap,
  handlePronounsReaction,
  handleZodiacReaction,
  handleReminderSelect,
  handleClearReminders
};

// console.log("🚨 ROLES FILE VERSION TEST");
// // utils/roles.js
// console.log("LOADING ROLES FILE");
// // ===== Pronoms (plusieurs possibles) =====
// const pronounsMap = {
//   "💛": "She/Her",
//   "💚": "He/Him",
//   "💜": "They/Them",
//   "🧡": "Any Pronouns",
//   "💙": "Ask Me"
// };

// // ===== Zodiac (un seul possible à la fois) =====
// const zodiacMap = {
//   "♈": "Aries",
//   "♉": "Taurus",
//   "♊": "Gemini",
//   "♋": "Cancer",
//   "♌": "Leo",
//   "♍": "Virgo",
//   "♎": "Libra",
//   "♏": "Scorpio",
//   "♐": "Sagittarius",
//   "♑": "Capricorn",
//   "♒": "Aquarius",
//   "♓": "Pisces"
// };
// // ===== Continents (plusieurs possibles) =====
// const continentsMap = {
//   "🦁": "Africa",         // Lion pour l'Afrique
//   "🐘": "Asia",           // Éléphant pour l'Asie
//   "🦅": "North America",  // Aigle pour l'Amérique du Nord
//   "🐺": "Europe",        // Loup pour l'Europe
//   "🦜": "South America",  // Perroquet pour l'Amérique du Sud
//   "🐨": "Oceania",        // Koala pour l'Océanie
//   "🐧": "Antarctica"      // Manchot pour l'Antarctique
// };

// // ===== Pronoms =====
// async function handlePronounsReaction(reaction, user, add) {
//   const roleName = pronounsMap[reaction.emoji.name];
//   if (!roleName) return;

//   const member = await reaction.message.guild.members.fetch(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) {
//     console.warn(`⚠️ Role "${roleName}" non trouvé sur le serveur ${reaction.message.guild.name}`);
//     return;
//   }

//   try {
//     if (add) {
//       await member.roles.add(role);
//       console.log(`[LOG] ${user.tag} a ajouté le rôle pronoms ${roleName}`);
//     } else {
//       await member.roles.remove(role);
//       console.log(`[LOG] ${user.tag} a retiré le rôle pronoms ${roleName}`);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===== Zodiac =====
// const zodiacLocks = new Map(); // clé = userId, valeur = booléen

// async function handleZodiacReaction(reaction, user, add) {
//   const member = await reaction.message.guild.members.fetch(user.id);
//   if (!member) return;

//   const emoji = reaction.emoji.name;
//   const newRoleName = zodiacMap[emoji];
//   if (!newRoleName) return;

//   const newRole = reaction.message.guild.roles.cache.find(r => r.name === newRoleName);
//   if (!newRole) {
//     console.warn(`⚠️ Role zodiac "${newRoleName}" non trouvé sur le serveur ${reaction.message.guild.name}`);
//     return;
//   }

//   // Si déjà en train de modifier le rôle zodiac, on ignore cette réaction
//   if (zodiacLocks.get(user.id)) return;
//   zodiacLocks.set(user.id, true);

//   try {
//     if (add) {
//       // Retirer tous les autres rôles zodiac
//       for (const key of Object.keys(zodiacMap)) {
//         const oldRole = reaction.message.guild.roles.cache.find(r => r.name === zodiacMap[key]);
//         if (oldRole && member.roles.cache.has(oldRole.id)) {
//           await member.roles.remove(oldRole);
//           console.log(`🌓 ${user.tag} n’a plus de signe (${oldRole.name} retiré)`);
//         }
//       }

//       // Ajouter le nouveau rôle zodiac
//       await member.roles.add(newRole);
//       console.log(`🌟 ${user.tag} est maintenant ${newRoleName}`);
//     } else {
//       if (member.roles.cache.has(newRole.id)) {
//         await member.roles.remove(newRole);
//         console.log(`🌓 ${user.tag} n’a plus de signe (${newRoleName} retiré)`);
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     zodiacLocks.delete(user.id);
//   }
  
//   // ✅ FIN DE LA FONCTION ICI
  
//   console.log("EXPORTING:", {
//     pronounsMap,
//     zodiacMap,
//     continentsMap
//   });
  
//   module.exports = {
//     pronounsMap,
//     zodiacMap,
//     continentsMap,
//     handlePronounsReaction,
//     handleZodiacReaction
//   };



// async function handleZodiacReaction(reaction, user, add) {
//   const emoji = reaction.emoji.name;
//   const roleName = zodiacMap[emoji];
//   if (!roleName) return;

//   const guild = reaction.message.guild;
//   const member = await guild.members.fetch(user.id);
//   if (!member) return;

//   const newRole = guild.roles.cache.find(r => r.name === roleName);
//   if (!newRole) {
//     console.warn(`⚠️ Role zodiac "${roleName}" non trouvé sur le serveur ${guild.name}`);
//     return;
//   }

//   if (!add) {
//     if (member.roles.cache.has(newRole.id)) {
//       await member.roles.remove(newRole);
//       console.log(`[LOG] ${user.tag} a retiré le rôle zodiac ${roleName}`);
//     }
//     return;
//   }

//   try {
//     // --- Retirer tous les autres rôles zodiac ---
//     const zodiacRoles = Object.values(zodiacMap)
//       .map(rName => guild.roles.cache.find(r => r.name === rName))
//       .filter(Boolean);

//     const rolesToRemove = zodiacRoles.filter(r => member.roles.cache.has(r.id) && r.id !== newRole.id);
//     if (rolesToRemove.length) await member.roles.remove(rolesToRemove);

//     // --- Retirer toutes les autres réactions zodiac de cet utilisateur ---
//     for (const r of reaction.message.reactions.cache.values()) {
//       if (zodiacMap[r.emoji.name] && r.emoji.name !== emoji) {
//         if (r.users.cache.has(user.id)) await r.users.remove(user.id);
//       }
//     }

//     // --- Ajouter le nouveau rôle ---
//     if (!member.roles.cache.has(newRole.id)) {
//       await member.roles.add(newRole);
//       console.log(`[LOG] ${user.tag} a ajouté le rôle zodiac ${roleName}`);
//     }
//   } catch (err) {
//     console.error("❌ Erreur handleZodiacReaction:", err);
//   }
// }

// module.exports = { pronounsMap, zodiacMap, handlePronounsReaction, handleZodiacReaction };

// // utils/roles.js
// const pronounsMap = {
//   "💛": "She/Her",
//   "💚": "He/Him",
//   "💜": "They/Them",
//   "🧡": "Any Pronouns",
//   "💙": "Ask Me"
// };

// const zodiacMap = {
//   "♈": "Aries",
//   "♉": "Taurus",
//   "♊": "Gemini",
//   "♋": "Cancer",
//   "♌": "Leo",
//   "♍": "Virgo",
//   "♎": "Libra",
//   "♏": "Scorpio",
//   "♐": "Sagittarius",
//   "♑": "Capricorn",
//   "♒": "Aquarius",
//   "♓": "Pisces"
// };

// // ===== Pronoms =====
// async function handlePronounsReaction(reaction, user, add) {
//   const roleName = pronounsMap[reaction.emoji.name];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) {
//     console.warn(`⚠️ Role "${roleName}" non trouvé sur le serveur ${reaction.message.guild.name}`);
//     return;
//   }

//   try {
//     if (add) {
//       await member.roles.add(role);
//       console.log(`[LOG] ${user.tag} a ajouté le rôle pronoms ${roleName}`);
//     } else {
//       await member.roles.remove(role);
//       console.log(`[LOG] ${user.tag} a retiré le rôle pronoms ${roleName}`);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===== Zodiac =====
// async function handleZodiacReaction(reaction, user, add) {
//   const emoji = reaction.emoji.name;
//   const roleName = zodiacMap[emoji];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const newRole = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!newRole) {
//     console.warn(`⚠️ Role zodiac "${roleName}" non trouvé sur le serveur ${reaction.message.guild.name}`);
//     return;
//   }

//   if (!add) {
//     if (member.roles.cache.has(newRole.id)) {
//       await member.roles.remove(newRole);
//       console.log(`[LOG] ${user.tag} a retiré le rôle zodiac ${roleName}`);
//     }
//     return;
//   }

//   // Supprime l'ancien rôle zodiac
//   for (const key of Object.keys(zodiacMap)) {
//     const oldRole = reaction.message.guild.roles.cache.find(r => r.name === zodiacMap[key]);
//     if (oldRole && member.roles.cache.has(oldRole.id)) {
//       await member.roles.remove(oldRole);
//       console.log(`[LOG] ${user.tag} a remplacé le rôle zodiac ${oldRole.name}`);
//     }
//   }

//   // Ajoute le nouveau rôle zodiac
//   await member.roles.add(newRole);
//   console.log(`[LOG] ${user.tag} a ajouté le rôle zodiac ${roleName}`);
// }

// module.exports = { pronounsMap, zodiacMap, handlePronounsReaction, handleZodiacReaction };


// // utils/roles.js

// const pronounsMap = {
//   "💛": "She/Her",
//   "💚": "He/Him",
//   "💜": "They/Them"
// };

// const zodiacMap = {
//   "♈": "Aries",
//   "♉": "Taurus",
//   "♊": "Gemini",
//   "♋": "Cancer",
//   "♌": "Leo",
//   "♍": "Virgo",
//   "♎": "Libra",
//   "♏": "Scorpio",
//   "♐": "Sagittarius",
//   "♑": "Capricorn",
//   "♒": "Aquarius",
//   "♓": "Pisces"
// };

// // ===== Pronouns =====
// async function handlePronounsReaction(reaction, user, add) {
//   const roleName = pronounsMap[reaction.emoji.name];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) return;

//   try {
//     if (add) {
//       await member.roles.add(role);
//       console.log(`[LOG] ${user.tag} added role ${roleName}`);
//     } else {
//       await member.roles.remove(role);
//       console.log(`[LOG] ${user.tag} removed role ${roleName}`);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===== Zodiac =====
// async function handleZodiacReaction(reaction, user, add) {
//   const emoji = reaction.emoji.name;
//   const roleName = zodiacMap[emoji];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const newRole = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!newRole) return;

//   if (add) {
//     // Supprimer l'ancien rôle zodiac
//     for (const key of Object.keys(zodiacMap)) {
//       const oldRole = reaction.message.guild.roles.cache.find(r => r.name === zodiacMap[key]);
//       if (oldRole && member.roles.cache.has(oldRole.id)) {
//         await member.roles.remove(oldRole);
//         console.log(`[LOG] ${user.tag} removed old zodiac role ${oldRole.name}`);
//       }
//     }

//     // Ajouter le nouveau rôle
//     await member.roles.add(newRole);
//     console.log(`[LOG] ${user.tag} added new zodiac role ${roleName}`);
//   } else {
//     // Retirer le rôle si reaction removed
//     if (member.roles.cache.has(newRole.id)) {
//       await member.roles.remove(newRole);
//       console.log(`[LOG] ${user.tag} removed zodiac role ${roleName}`);
//     }
//   }
// }

// module.exports = { handlePronounsReaction, handleZodiacReaction, pronounsMap, zodiacMap };


// // utils/roles.js

// // ===== Mappings =====
// const pronounsMap = {
//   "💛": "She/Her",
//   "💚": "He/Him",
//   "💜": "They/Them"
// };

// // Zodiac → single-choice via emoji
// const zodiacMap = {
//   "♈": "Aries",
//   "♉": "Taurus",
//   "♊": "Gemini",
//   "♋": "Cancer",
//   "♌": "Leo",
//   "♍": "Virgo",
//   "♎": "Libra",
//   "♏": "Scorpio",
//   "♐": "Sagittarius",
//   "♑": "Capricorn",
//   "♒": "Aquarius",
//   "♓": "Pisces"
// };

// // ===== Pronouns =====
// async function handlePronounsReaction(reaction, user, add) {
//   const roleName = pronounsMap[reaction.emoji.name];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) return;

//   try {
//     if (add) {
//       await member.roles.add(role);
//       console.log(`[LOG] ${user.tag} added role ${roleName}`);
//     } else {
//       await member.roles.remove(role);
//       console.log(`[LOG] ${user.tag} removed role ${roleName}`);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===== Zodiac =====
// async function handleZodiacReaction(reaction, user, add) {
//   const emoji = reaction.emoji.name;
//   const roleName = zodiacMap[emoji];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) return;

//   if (add) {
//     // Supprimer l'ancien rôle zodiac
//     for (const key of Object.keys(zodiacMap)) {
//       const oldRole = reaction.message.guild.roles.cache.find(r => r.name === zodiacMap[key]);
//       if (oldRole && member.roles.cache.has(oldRole.id)) {
//         await member.roles.remove(oldRole);
//         console.log(`[LOG] ${user.tag} removed old zodiac role ${oldRole.name}`);
//       }
//     }
//     // Ajouter le nouveau rôle
//     await member.roles.add(role);
//     console.log(`[LOG] ${user.tag} added new zodiac role ${roleName}`);
//   } else {
//     // Retirer le rôle si reaction removed
//     if (member.roles.cache.has(role.id)) {
//       await member.roles.remove(role);
//       console.log(`[LOG] ${user.tag} removed zodiac role ${roleName}`);
//     }
//   }
// }

// module.exports = { handlePronounsReaction, handleZodiacReaction, pronounsMap, zodiacMap };


// // utils/roles.js

// const pronounsMap = {
//   "💛": "She/Her",
//   "💚": "He/Him",
//   "💜": "They/Them"
// };

// const zodiacMap = {
//   "♈": "Aries",
//   "♉": "Taurus",
//   "♊": "Gemini",
//   "♋": "Cancer",
//   "♌": "Leo",
//   "♍": "Virgo",
//   "♎": "Libra",
//   "♏": "Scorpio",
//   "♐": "Sagittarius",
//   "♑": "Capricorn",
//   "♒": "Aquarius",
//   "♓": "Pisces"
// };

// // ===== Pronoms =====
// async function handlePronounsReaction(reaction, user, add) {
//   const emoji = reaction.emoji.name;
//   const roleName = pronounsMap[emoji];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) return;

//   try {
//     if (add) await member.roles.add(role);
//     else await member.roles.remove(role);

//     console.log(`[LOG] ${user.tag} ${add ? "added" : "removed"} role ${roleName}`);
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===== Zodiac =====
// async function handleZodiacReaction(reaction, user) {
//   const emoji = reaction.emoji.name;
//   const newRoleName = zodiacMap[emoji];
//   if (!newRoleName) return;

//   const guild = reaction.message.guild;
//   const member = guild.members.cache.get(user.id);
//   if (!member) return;

//   const newRole = guild.roles.cache.find(r => r.name === newRoleName);
//   if (!newRole) return;

//   try {
//     // Supprime l'ancien rôle zodiac
//     for (const key in zodiacMap) {
//       const oldRole = guild.roles.cache.find(r => r.name === zodiacMap[key]);
//       if (oldRole && member.roles.cache.has(oldRole.id)) {
//         await member.roles.remove(oldRole);
//       }
//     }

//     // Ajoute le nouveau
//     await member.roles.add(newRole);
//     console.log(`[LOG] ${user.tag} set zodiac role to ${newRoleName}`);
//   } catch (err) {
//     console.error(err);
//   }
// }

// module.exports = { pronounsMap, zodiacMap, handlePronounsReaction, handleZodiacReaction };


// const pronounsMap = { "💛": "She/Her", "💚": "He/Him", "💜": "They/Them" };
// const continentsMap = {
//   "africa": "Africa", "asia": "Asia", "europe": "Europe", "america": "America", "oceania": "Oceania"
// };
// const zodiacMap = {
//   "aries": "Aries", "taurus": "Taurus", "gemini": "Gemini", "cancer": "Cancer",
//   "leo": "Leo", "virgo": "Virgo", "libra": "Libra", "scorpio": "Scorpio",
//   "sagittarius": "Sagittarius", "capricorn": "Capricorn", "aquarius": "Aquarius", "pisces": "Pisces"
// };

// // Pronouns reaction
// async function handlePronounsReaction(reaction, user, add) {
//   const roleName = pronounsMap[reaction.emoji.name];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;
//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) return;

//   try { if (add) await member.roles.add(role); else await member.roles.remove(role); } 
//   catch (err) { console.error(err); }
// }

// // Continents & Zodiac buttons
// async function handleButton(interaction) {
//   const member = interaction.guild.members.cache.get(interaction.user.id);
//   if (!member) return;

//   const customId = interaction.customId;

//   // Continents multi-roles
//   if (continentsMap[customId]) {
//     const roleName = continentsMap[customId];
//     const role = interaction.guild.roles.cache.find(r => r.name === roleName);
//     if (!role) return;

//     if (member.roles.cache.has(role.id)) await member.roles.remove(role);
//     else await member.roles.add(role);

//     await interaction.reply({ content: `Updated role: ${roleName}`, ephemeral: true });
//     return;
//   }

//   // Zodiac single-choice
//   if (zodiacMap[customId]) {
//     const newRole = interaction.guild.roles.cache.find(r => r.name === zodiacMap[customId]);
//     if (!newRole) return;

//     // Remove old zodiac
//     for (const key in zodiacMap) {
//       const r = interaction.guild.roles.cache.find(role => role.name === zodiacMap[key]);
//       if (r && member.roles.cache.has(r.id)) await member.roles.remove(r);
//     }

//     await member.roles.add(newRole);
//     await interaction.reply({ content: `Your zodiac is now ${newRole.name}`, ephemeral: true });
//   }
// }

// module.exports = { handlePronounsReaction, handleButton };



// // utils/roles.js
// const { PermissionsBitField } = require("discord.js");

// // Mapping des emojis pronoms → rôle
// const pronounsMap = {
//   "💛": "She/Her",
//   "💚": "He/Him",
//   "💜": "They/Them"
// };

// // Mapping boutons continents → rôle
// const continentsMap = {
//   "africa": "Africa",
//   "asia": "Asia",
//   "europe": "Europe",
//   "america": "America",
//   "oceania": "Oceania"
// };

// // Mapping boutons zodiac → rôle
// const zodiacMap = {
//   "aries": "Aries",
//   "taurus": "Taurus",
//   "gemini": "Gemini",
//   "viergo": "Virgo",
//   "cancer": "Cancer",
//   "leo": "Leo", 
//   "libra": "Libra",
//   // ajouter tous les signes
// };

// // ===== Pronoms =====
// async function handlePronounsReaction(reaction, user, add) {
//   const roleName = pronounsMap[reaction.emoji.name];
//   if (!roleName) return;

//   const member = reaction.message.guild.members.cache.get(user.id);
//   if (!member) return;

//   const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
//   if (!role) return;

//   try {
//     if (add) {
//       await member.roles.add(role);
//     } else {
//       await member.roles.remove(role);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===== Boutons Continents et Zodiac =====
// async function handleButton(interaction) {
//   const member = interaction.guild.members.cache.get(interaction.user.id);
//   if (!member) return;

//   const customId = interaction.customId;

//   // Continents → multi-roles
//   if (continentsMap[customId]) {
//     const roleName = continentsMap[customId];
//     const role = interaction.guild.roles.cache.find(r => r.name === roleName);
//     if (!role) return;

//     if (member.roles.cache.has(role.id)) {
//       await member.roles.remove(role);
//       await interaction.reply({ content: `Removed role ${roleName}`, ephemeral: true });
//     } else {
//       await member.roles.add(role);
//         // Répond de façon invisible pour éviter "interaction failed"
//   await interaction.deferUpdate();
//   return;
//       // await interaction.reply({ content: `Added role ${roleName}`, ephemeral: true });
//     }
//     return;
//   }

//   // Zodiac → single-choice
//   if (zodiacMap[customId]) {
//     const newRoleName = zodiacMap[customId];
//     const newRole = interaction.guild.roles.cache.find(r => r.name === newRoleName);
//     if (!newRole) return;

//     // Supprimer ancien rôle zodiac
//     for (const key in zodiacMap) {
//       const role = interaction.guild.roles.cache.find(r => r.name === zodiacMap[key]);
//       if (role && member.roles.cache.has(role.id)) {
//         await member.roles.remove(role);
//       }
//     }

//     // Ajouter nouveau rôle
//     await member.roles.add(newRole);
//     await interaction.reply({ content: `Your zodiac is now set to ${newRoleName}`, ephemeral: true });
//   }
// }

// module.exports = { handlePronounsReaction, handleButton };

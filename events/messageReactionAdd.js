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

  console.log("=== ROLES ===");

guild.roles.cache.forEach(role => {
  console.log(`[${role.name}]`);
});

const verifiedRole =
  guild.roles.cache.find(
    r => r.name.includes("Verified")
  );

console.log("Verified trouvé :", verifiedRole?.name);


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

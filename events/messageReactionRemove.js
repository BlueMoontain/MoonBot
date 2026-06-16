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
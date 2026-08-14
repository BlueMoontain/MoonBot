/**
 * Configuration centralisée des salons pour BotStarion (TEST vs PRODUCTION)
 */

const ENV = process.env.APP_ENV || "test";

const CONFIG = {
  test: {
    useIds: false,
    channels: {
      rules: { name: "rules-📘" },
      getRoles: { name: "getroles" },
      general: { name: "général" },
      reminders: { name: "salon-reminders" },
      dailyPost: null,
      dailyPostReact: null,
      venting: null
    },
    // Interdiction des interventions générales de lore dans rules et getroles en TEST
    generalLoreForbiddenNames: [
      "rules-📘",
      "getroles"
    ]
  },
  production: {
    useIds: true,
    channels: {
      rules: { id: "1368909845130117171", name: "rules" },
      getRoles: { id: "1368942187655467140", name: "get-roles" },
      general: { id: "1368909845130117174", name: "general" },
      reminders: { id: "1368909845130117174", name: "general" },
      dailyPost: { id: "1368923164322693344", name: "⭐️-daily-post-⭐️" },
      dailyPostReact: { id: "1393173385483390996", name: "daily-post-react" },
      venting: { id: "1428441197650772119", name: "venting-room-😮‍💨" }
    },
    // IDs des salons où les interventions générales de lore sont STRICTEMENT INTERDITES
    generalLoreForbiddenIds: [
      "1368909845130117171", // rules (acceptation règles autorisée uniquement)
      "1368916252642377802", // art-challenge-rules (interdit)
      "1368942187655467140", // get-roles (sélection rôles autorisée uniquement)
      "1368909845130117172", // news-and-annnouncements (interdit)
      "1368909845130117175", // events (interdit)
      "1371602373180522617", // trigger-list (interdit)
      "1369070642795642910", // bot-commands-and-tips (interdit)
      "1368923164322693344", // ⭐️-daily-post-⭐️ (silencieux)
      "1428441197650772119"  // venting-room (interdiction absolue en prod)
    ]
  }
};

function getChannelConfig() {
  return CONFIG[ENV] || CONFIG.test;
}

/**
 * Indique si un salon Discord correspond à une entrée de configuration.
 */
function isChannelMatch(channel, targetConfig) {
  if (!channel || !targetConfig) return false;
  const cfg = getChannelConfig();
  if (cfg.useIds && targetConfig.id) {
    return channel.id === targetConfig.id;
  }
  if (targetConfig.name) {
    return channel.name === targetConfig.name || channel.name.includes(targetConfig.name);
  }
  return false;
}

/**
 * Recherche un salon textuel dans une guilde d'après l'entrée de configuration.
 */
function findChannel(guild, targetConfig) {
  if (!guild || !targetConfig) return null;
  const cfg = getChannelConfig();
  if (cfg.useIds && targetConfig.id) {
    return guild.channels.cache.get(targetConfig.id) || null;
  }
  if (targetConfig.name) {
    return guild.channels.cache.find(c => (c.name === targetConfig.name || c.name.includes(targetConfig.name)) && c.isTextBased()) || null;
  }
  return null;
}

/**
 * Indique si les interventions générales (lore, mots-clés, majuscules, pensées) sont autorisées dans ce salon.
 */
function isGeneralLoreAllowed(channel) {
  if (!channel) return false;
  const cfg = getChannelConfig();

  if (cfg.useIds) {
    if (cfg.generalLoreForbiddenIds && cfg.generalLoreForbiddenIds.includes(channel.id)) {
      return false;
    }
  } else {
    if (cfg.generalLoreForbiddenNames && cfg.generalLoreForbiddenNames.includes(channel.name)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  getChannelConfig,
  isChannelMatch,
  findChannel,
  isGeneralLoreAllowed,
  ENV
};

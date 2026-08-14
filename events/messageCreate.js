const {

  loreConfig,

  loreMessages,

  easterEggs,

  loreChannels

} = require("../utils/lore");

module.exports = {
    name: "messageCreate",
  
    async execute(message, client) {
  
      // Ignore bots
      if (message.author.bot) return;
  
      // Prefix
      const prefix = "!";
  
      const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
  
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      const {
        loadCustomCommands
      } = require("../utils/customCommands");
      
      try {
      
        // ===== Native JS Commands =====
        if (command) {
      
          await command.execute(message, args);
      
          return;
        }
      
// ===== Dynamic Custom Commands =====
const customCommands = loadCustomCommands();

const customData = customCommands[commandName];

if (customData?.responses?.length) {

  const responses = customData.responses;

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  switch (randomResponse.type) {

    case "text":
      await message.reply(randomResponse.content);
      break;

    case "gif":
    case "image":
    case "video":
      await message.reply(randomResponse.content);
      break;

    default:
      console.warn(
        `⚠️ Unknown response type: ${randomResponse.type}`
      );
  }

  return;
}
      // ===== Lore / Easter Eggs =====

const channelCooldowns =
  client.channelCooldowns ||
  new Map();

client.channelCooldowns =
  channelCooldowns;

const uppercaseCooldowns =
  client.uppercaseCooldowns ||
  new Map();

client.uppercaseCooldowns =
  uppercaseCooldowns;

const lastReply =
  channelCooldowns.get(message.channel.id);

const lastUppercaseReply =
  uppercaseCooldowns.get(message.channel.id);

const now = Date.now();

const onCooldown =
  lastReply &&
  now - lastReply <
    loreConfig.channelCooldown;

const onUppercaseCooldown =
  lastUppercaseReply &&
  now - lastUppercaseReply <
    loreConfig.uppercaseCooldown;

const { getChannelConfig, isChannelMatch, findChannel, isGeneralLoreAllowed } = require("../config/channels");
const config = getChannelConfig();

    const isVentingChannel = isChannelMatch(message.channel, config.channels.venting);
    const isDailyPostChannel = isChannelMatch(message.channel, config.channels.dailyPost);
    const generalLoreAllowed = isGeneralLoreAllowed(message.channel);

    // ===== Daily Post Handling =====
    if (isDailyPostChannel) {
      console.log(`[DAILY POST] Detected post in ${message.channel.name} by ${message.author.tag}`);
      const reactChannel = findChannel(message.guild, config.channels.dailyPostReact);
      if (reactChannel) {
        // En préparation pour la réponse future dans dailyPostReact (sans jamais parler dans dailyPost)
        console.log(`[DAILY POST] Target reaction channel: ${reactChannel.name}`);
      }
      return;
    }

if (!message.content.startsWith(prefix) &&
    !onCooldown && 
    generalLoreAllowed) {

  let triggered = false;

  const content =
    message.content.toLowerCase();

    // ===== Venting Room =====

if (
  isVentingChannel &&
  Math.random() < 0.08
) {

  const responses =
    loreMessages.ventingReplies;

  const response =
    responses[
      Math.floor(
        Math.random() *
        responses.length
      )
    ];

  console.log(
    "[LORE] Venting reply triggered"
  );

  await message.reply(response);

  triggered = true;
}

  // ===== Mention =====
  if (
    message.mentions.has(client.user) &&
    Math.random() < 0.7
  ) {

    const responses =
      loreMessages.onMention;

    const response =
      responses[
        Math.floor(
          Math.random() *
          responses.length
        )
      ];
      console.log("[LORE] Mention triggered");
    await message.reply(response);

    triggered = true;
  }

  // ===== Keywords =====
  if (!triggered) {

    for (const [keyword, data]
      of Object.entries(
        easterEggs.keywords
      )) {

      const escapedKeyword =
        keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const keywordRegex =
        new RegExp(
          `(?:^|[^\\p{L}])${escapedKeyword}(?:$|[^\\p{L}])`,
          "iu"
        );

      if (
        keywordRegex.test(message.content) &&
        Math.random() < data.probability
      ) {

        const response =
          data.responses[
            Math.floor(
              Math.random() *
              data.responses.length
            )
          ];
console.log(
  `[LORE] Keyword triggered: ${keyword}`
);
        await message.reply(response);

        triggered = true;

        break;
      }
    }
  }

  // ===== Regex Patterns =====
  if (!triggered) {

    for (const patternData
      of easterEggs.patterns) {

      if (
        patternData.pattern.test(content) &&
        Math.random() <
          patternData.probability
      ) {

        const response =
          patternData.responses[
            Math.floor(
              Math.random() *
              patternData.responses.length
            )
          ];
console.log(
  `[LORE] Pattern triggered: ${patternData.pattern}`
);
        await message.reply(response);

        triggered = true;

        break;
      }
    }
  }

  // ===== Ancient Text =====

if (!triggered) {

  const ancientKeywords = [

    "vampire",
    "vampyr",
    "blood",
    "curse",
    "night"
  ];

  const mentionsAncient =
    ancientKeywords.some(keyword =>
      content.includes(keyword)
    );

  const isNightTime =
    new Date().getHours() >= 22 ||
    new Date().getHours() <= 4;

  if (
    mentionsAncient &&
    isNightTime &&
    Math.random() < 0.01
  ) {

    const ancientText =
      loreMessages.ancientTexts[
        Math.floor(
          Math.random() *
          loreMessages.ancientTexts.length
        )
      ];

    console.log(
      "[LORE] Ancient text triggered"
    );

    await message.reply(
      ancientText
    );

    triggered = true;
  }
}

  // ===== Uppercase Detector =====
  if (!triggered && !onUppercaseCooldown) {
    const letters = message.content.match(/\p{L}/gu) || [];
    const uppercaseLetters = message.content.match(/\p{Lu}/gu) || [];
    const words = message.content.trim().split(/\s+/);

    const hasMinLetters = letters.length >= 8;
    const isMostlyCaps = letters.length > 0 && (uppercaseLetters.length / letters.length) >= 0.85;
    const hasSufficientContext = words.length >= 3 || letters.length >= 12;

    if (hasMinLetters && isMostlyCaps && hasSufficientContext) {
      const responses = loreMessages.uppercaseReplies;
      const response = responses[Math.floor(Math.random() * responses.length)];
      console.log("[LORE] Uppercase detected:", message.content);
      await message.reply(response);
      triggered = true;
      uppercaseCooldowns.set(message.channel.id, now);
    }
  }

  if (triggered) {

    channelCooldowns.set(
      message.channel.id,
      now
    );
  }
}
      } catch (err) {
      
        console.error(
          `❌ Error executing command ${commandName}:`,
          err
        );
      
        message.reply("❌ Error while executing command.");
      }
    }
  };
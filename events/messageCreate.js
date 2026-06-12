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
  
      // Ignore non-commands
      // if (!message.content.startsWith(prefix)) return; //a voir
  
      // Parse command
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

const lastReply =
  channelCooldowns.get(message.channel.id);

const now = Date.now();

const onCooldown =
  lastReply &&
  now - lastReply <
    loreConfig.channelCooldown;

    const channelName =
  message.channel.name;

  const isVentingChannel =
  loreChannels.venting.includes(
    channelName
  );

const loreDisabled =
  loreChannels.disabled.includes(
    channelName
  );

if (!message.content.startsWith(prefix) &&
    !onCooldown && 
    !loreDisabled) {

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

      if (
        content.includes(keyword) &&
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

  // ===== Random Thoughts =====
  if (
    !triggered &&
    Math.random() <
      loreConfig.randomThoughtChance
  ) {
const useRareThought =
  Math.random() < 0.1;

const responses =
  useRareThought
    ? loreMessages.rareThoughts
    : loreMessages.randomThoughts;

    const response =
      responses[
        Math.floor(
          Math.random() *
          responses.length
        )
      ];
console.log(
  "[LORE] Random thought triggered"
);
    await message.reply(response);

    triggered = true;
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
    //   // Find command
    //   const command = client.commands.get(commandName);
  
    //   if (!command) return;
  
    //   try {
  
    //     await command.execute(message, args);
  
    //   } catch (err) {
  
    //     console.error(`❌ Error executing command ${commandName}:`, err);
  
    //     message.reply("❌ Error while executing command.");
    //   }
    }
  };
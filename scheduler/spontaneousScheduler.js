const { loreMessages } = require("../utils/lore");

let schedulerStarted = false;

function startSpontaneousScheduler(client) {
  if (schedulerStarted) {
    return;
  }
  schedulerStarted = true;

  console.log("[SPONTANEOUS] Scheduler started");
  scheduleNextThought(client);
}

function scheduleNextThought(client) {
  const minMinutes = 15;
  const maxMinutes = 45;
  const randomMinutes = Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
  const delayMs = randomMinutes * 60 * 1000;

  console.log(`[SPONTANEOUS] Next thought scheduled in ${randomMinutes} minutes`);

  setTimeout(async () => {
    try {
      await sendSpontaneousThought(client);
    } catch (err) {
      console.error("[SPONTANEOUS] Error sending thought:", err);
    } finally {
      scheduleNextThought(client);
    }
  }, delayMs);
}

const { getChannelConfig, findChannel } = require("../config/channels");

async function sendSpontaneousThought(client) {
  const config = getChannelConfig();

  for (const guild of client.guilds.cache.values()) {
    const channel = findChannel(guild, config.channels.general);

    if (!channel) {
      console.warn(`[SPONTANEOUS] General channel not found in ${guild.name}`);
      continue;
    }

    const thoughts = loreMessages.randomThoughts;
    if (!thoughts || thoughts.length === 0) {
      continue;
    }

    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];

    await channel.send(randomThought);
    console.log(`[SPONTANEOUS] Sent thought in #${channel.name} (${guild.name})`);
  }
}

module.exports = {
  startSpontaneousScheduler
};

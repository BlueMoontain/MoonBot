// commands/continents.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { continentsMessage } = require("../config/messages.json");

module.exports = {
  name: "continents",
  description: "Send continents message with buttons",
  async execute(message, args) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder().setCustomId("africa").setLabel("Africa").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("asia").setLabel("Asia").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("europe").setLabel("Europe").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("america").setLabel("America").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("oceania").setLabel("Oceania").setStyle(ButtonStyle.Primary)
      );

    await message.channel.send({ content: continentsMessage, components: [row] });
    message.reply("✅ Continents message sent!");
  }
};

// utils/messagesManager.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { pronounsMessage, continentsMessage, zodiacMessage } = require("../config/messages.json");

async function sendPinnedQuestions(channel) {
  // Pronoms
  const pronounsRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("sheher").setLabel("She/Her").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("hehim").setLabel("He/Him").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("theythem").setLabel("They/Them").setStyle(ButtonStyle.Primary)
  );
  const pronounsSent = await channel.send({ content: pronounsMessage, components: [pronounsRow] });
  await pronounsSent.pin();

  // Continents
  const continentsRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("africa").setLabel("Africa").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("asia").setLabel("Asia").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("europe").setLabel("Europe").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("america").setLabel("America").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("oceania").setLabel("Oceania").setStyle(ButtonStyle.Primary)
  );
  const continentsSent = await channel.send({ content: continentsMessage, components: [continentsRow] });
  await continentsSent.pin();

  // Zodiac
  const zodiacRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("aries").setLabel("Aries").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("taurus").setLabel("Taurus").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("gemini").setLabel("Gemini").setStyle(ButtonStyle.Primary)
    // Ajouter tous les signes ici
  );
  const zodiacSent = await channel.send({ content: zodiacMessage, components: [zodiacRow] });
  await zodiacSent.pin();
}

module.exports = { sendPinnedQuestions };

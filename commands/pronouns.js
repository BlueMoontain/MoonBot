// commands/pronouns.js
const { pronounsMessage } = require("../config/messages.json");

module.exports = {
  name: "pronouns",
  description: "Send pronouns message with reactions",
  async execute(message, args) {
    //const msg = await message.channel.send(pronounsMessage);
    const msg = await message.channel.send(pronounsMessage + "\n\nReact with the hearts to get your role!");
    await msg.pin();

    const reactions = ["💛", "💚", "💜"];
    for (const emoji of reactions) await msg.react(emoji);

    //message.reply("✅ Pronouns message sent!");
  }
};

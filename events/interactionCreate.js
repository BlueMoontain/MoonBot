const { handleButton } = require("../utils/roles");

module.exports = {
  name: "interactionCreate",
  execute: (client, interaction) => {
    if (!interaction.isButton()) return;
    handleButton(interaction);
  }
};

// const { handleButton } = require("../utils/roles");

// module.exports = {
//   name: "interactionCreate",
//   async execute(client, interaction) { if (!interaction.isButton()) return; handleButton(interaction); }
// };

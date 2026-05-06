const {
  handleButton,
  handleReminderSelect
} = require("../utils/roles");

module.exports = {
  name: "interactionCreate",

  async execute(interaction) {

    // ===== Buttons =====
    if (interaction.isButton()) {
      return handleButton(interaction);
    }

    // ===== Reminder Dropdown =====
    if (
      interaction.isStringSelectMenu() &&
      interaction.customId === "reminder-select"
    ) {
      return handleReminderSelect(interaction);
    }
  }
};
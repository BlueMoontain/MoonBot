const {
  handleButton,
  handleReminderSelect,
  handleClearReminders
} = require("../utils/roles");

module.exports = {
  name: "interactionCreate",

  async execute(interaction) {

    // ===== Buttons =====
    if (interaction.isButton()) {

      // Clear reminders
      if (interaction.customId === "clear-reminders") {
        return handleClearReminders(interaction);
      }

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
const {
  handleButton,
  handleReminderSelect,
  handleClearReminders
} = require("../utils/roles");


module.exports = {
  name: "interactionCreate",

  
  async execute(interaction) {
console.log("📥 Interaction reçue :", interaction.customId);
    // ===== Buttons =====
if (interaction.isButton()) {

  if (interaction.customId === "clear-reminders") {
    return handleClearReminders(interaction);
  }

  return;
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
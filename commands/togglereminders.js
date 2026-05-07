const {
    toggleReminders
  } = require("../utils/reminderState");
  
  module.exports = {
  
    name: "togglereminders",
  
    description: "Enable or disable reminders",
  
    async execute(message) {
  
      // ===== Admin Only =====
      if (!message.member.permissions.has("Administrator")) {
        return message.reply(
          "❌ You do not have permission."
        );
      }
  
      const enabled = toggleReminders();
  
      if (enabled) {
  
        return message.reply(
          "🔔 Reminders enabled."
        );
      }
  
      return message.reply(
        "🔕 Reminders disabled."
      );
    }
  };
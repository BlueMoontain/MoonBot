const {
    ActionRowBuilder,
    StringSelectMenuBuilder
  } = require("discord.js");
  
  function buildReminderMenu() {
  
    const reminderOptions = [
      { label: "00:00 UTC", value: "00:00" },
      { label: "02:00 UTC", value: "02:00" },
      { label: "04:00 UTC", value: "04:00" },
      { label: "06:00 UTC", value: "06:00" },
      { label: "08:00 UTC", value: "08:00" },
      { label: "10:00 UTC", value: "10:00" },
      { label: "12:00 UTC", value: "12:00" },
      { label: "14:00 UTC", value: "14:00" },
      { label: "16:00 UTC", value: "16:00" },
      { label: "18:00 UTC", value: "18:00" },
      { label: "20:00 UTC", value: "20:00" },
      { label: "22:00 UTC", value: "22:00" }
    ];
  
    const menu = new StringSelectMenuBuilder()
      .setCustomId("reminder-select")
      .setPlaceholder("Select your reminder times")
      .setMinValues(0)
      .setMaxValues(reminderOptions.length)
      .addOptions(reminderOptions);
  
    return new ActionRowBuilder().addComponents(menu);
  }
  
  module.exports = {
    buildReminderMenu
  };
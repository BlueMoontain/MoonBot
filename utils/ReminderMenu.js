const {
    ActionRowBuilder,
    StringSelectMenuBuilder
  } = require("discord.js");
  
  function buildReminderMenu() {
  
    const reminderOptions = [
        { label: "12 AM", value: "12 AM" },
        { label: "2 AM", value: "2 AM" },
        { label: "4 AM", value: "4 AM" },
        { label: "6 AM", value: "6 AM" },
        { label: "8 AM", value: "8 AM" },
        { label: "10 AM", value: "10 AM" },
        { label: "12 PM", value: "12 PM" },
        { label: "2 PM", value: "2 PM" },
        { label: "4 PM", value: "4 PM" },
        { label: "6 PM", value: "6 PM" },
        { label: "8 PM", value: "8 PM" },
        { label: "10 PM", value: "10 PM" }
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
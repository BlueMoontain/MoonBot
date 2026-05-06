const { remindersMap } = require("../utils/roles");

function startReminderScheduler(client) {

  console.log("⏰ Reminder scheduler started");

  setInterval(async () => {
    console.log("⏰ Scheduler tick");

    const now = new Date();

    const utcHour = now.getUTCHours();

   
    const formattedHour = formatHour(utcHour);

    const roleName = remindersMap[formattedHour];

    if (!roleName) return;

    console.log(`⏰ Checking reminders for ${formattedHour}`);

    for (const guild of client.guilds.cache.values()) {

      const role = guild.roles.cache.find(
        
        r => r.name === roleName
      );

      if (!role) continue;

      const reminderChannel = guild.channels.cache.find(
        c => c.name === "général" && c.isTextBased()
      );

      if (!reminderChannel) continue;

      await reminderChannel.send({
        content: `⏰ <@&${role.id}> Reminder time!`
      });

      console.log(`📢 Reminder sent for ${roleName}`);
    }

  }, 60 * 1000);
}

function formatHour(hour) {

  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";

  return `${hour - 12} PM`;
}

module.exports = {
  startReminderScheduler
};
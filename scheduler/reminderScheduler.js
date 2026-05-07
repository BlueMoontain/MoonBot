const { remindersMap } = require("../utils/roles");

let lastTriggeredHour = null;

function startReminderScheduler(client) {

  console.log("⏰ Reminder scheduler started");

  setInterval(async () => {

    try {

      const now = new Date();

      const utcHour = now.getUTCHours();

      // // ===== DEBUG =====
      // const formattedHour = "2 PM";

      // ===== PROD =====
      const formattedHour = formatHour(utcHour);

      const roleName = remindersMap[formattedHour];

      if (!roleName) return;

      console.log(`⏰ Checking reminders for ${formattedHour}`);

      if (lastTriggeredHour === formattedHour) {
        return;
      }

      for (const guild of client.guilds.cache.values()) {

        const role = guild.roles.cache.find(
          r => r.name === roleName
        );

        if (!role) continue;

        const members = await guild.members.fetch();

        const membersWithRole = members.filter(member =>
          member.roles.cache.has(role.id)
        );

        if (membersWithRole.size === 0) {
          continue;
        }

        const reminderChannel = guild.channels.cache.find(
          c => c.name === "général" && c.isTextBased()
        );

        if (!reminderChannel) {
          console.log("❌ Reminder channel not found");
          continue;
        }

        lastTriggeredHour = formattedHour;

        await reminderChannel.send({
          content: `⏰ <@&${role.id}> Reminder time!`
        });

        console.log(`📢 Reminder sent for ${roleName}`);
      }

    } catch (err) {

      console.error("❌ Reminder scheduler error:", err);
    }

  }, 60 * 1000);
}

function formatHour(hour) {

  if (hour === 0) return "12 AM";

  if (hour < 12) {
    return `${hour} AM`;
  }

  if (hour === 12) {
    return "12 PM";
  }

  return `${hour - 12} PM`;
}

module.exports = {
  startReminderScheduler
};
module.exports = {
    name: "messageCreate",
  
    async execute(message, client) {
  
      // Ignore bots
      if (message.author.bot) return;
  
      // Prefix
      const prefix = "!";
  
      // Ignore non-commands
      if (!message.content.startsWith(prefix)) return;
  
      // Parse command
      const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
  
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      const {
        loadCustomCommands
      } = require("../utils/customCommands");
      
      try {
      
        // ===== Native JS Commands =====
        if (command) {
      
          await command.execute(message, args);
      
          return;
        }
      
        // ===== Dynamic Custom Commands =====
        const customCommands = loadCustomCommands();
      
const customData = customCommands[commandName];

if (customData?.responses?.length) {

  const responses = customData.responses;

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  await message.reply(randomResponse);

  return;
}
      
      } catch (err) {
      
        console.error(
          `❌ Error executing command ${commandName}:`,
          err
        );
      
        message.reply("❌ Error while executing command.");
      }
    //   // Find command
    //   const command = client.commands.get(commandName);
  
    //   if (!command) return;
  
    //   try {
  
    //     await command.execute(message, args);
  
    //   } catch (err) {
  
    //     console.error(`❌ Error executing command ${commandName}:`, err);
  
    //     message.reply("❌ Error while executing command.");
    //   }
    }
  };
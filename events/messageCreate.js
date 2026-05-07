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
  
      // Find command
      const command = client.commands.get(commandName);
  
      if (!command) return;
  
      try {
  
        await command.execute(message, args);
  
      } catch (err) {
  
        console.error(`❌ Error executing command ${commandName}:`, err);
  
        message.reply("❌ Error while executing command.");
      }
    }
  };
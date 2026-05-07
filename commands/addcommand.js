const {
    loadCustomCommands,
    saveCustomCommands
  } = require("../utils/customCommands");
  
  module.exports = {
  
    name: "addcommand",
  
    description: "Create a custom command",
  
    async execute(message, args) {
  
      if (args.length < 2) {
        return message.reply(
          "❌ Usage: !addcommand <name> <response>"
        );
      }
  
      const commandName = args.shift().toLowerCase();
  
      const response = args.join(" ");
  
      const commands = loadCustomCommands();
  
      commands[commandName] = response;
  
      saveCustomCommands(commands);
  
      message.reply(
        `✅ Custom command !${commandName} created.`
      );
    }
  };
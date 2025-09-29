  module.exports = {
    name: "hello",
    description: "Dit bonjour",
    execute(message, args) {
      message.reply("Salut 👋, je suis ton bot !");
    },
  };
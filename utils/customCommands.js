const fs = require("fs");
const path = require("path");

const commandsPath = path.join(
  __dirname,
  "../data/customCommands.json"
);

function loadCustomCommands() {

  if (!fs.existsSync(commandsPath)) {
    return {};
  }

  const data = fs.readFileSync(commandsPath, "utf8");

  return JSON.parse(data);
}

function saveCustomCommands(commands) {

  fs.writeFileSync(
    commandsPath,
    JSON.stringify(commands, null, 2)
  );
}

module.exports = {
  loadCustomCommands,
  saveCustomCommands
};
const express = require("express");
const path = require("path");

const commandsRoute = require("./routes/commands");

const app = express();

app.use(express.json());

app.use("/api/commands", commandsRoute);

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🌍 Web panel running on http://localhost:${PORT}`);
});
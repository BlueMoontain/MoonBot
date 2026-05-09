const express = require("express");

const {
  loadCustomCommands,
  saveCustomCommands
} = require("../../utils/customCommands");

const router = express.Router();


// ===== GET ALL =====
router.get("/", (req, res) => {

  const commands = loadCustomCommands();

  res.json(commands);
});


// ===== CREATE / UPDATE =====
router.post("/", (req, res) => {

  const { name, responses } = req.body;

  if (!name || !Array.isArray(responses)) {
    return res.status(400).json({
      error: "Invalid payload"
    });
  }

  const commands = loadCustomCommands();

  commands[name.toLowerCase()] = responses;

  saveCustomCommands(commands);

  res.json({
    success: true
  });
});


// ===== DELETE =====
router.delete("/:name", (req, res) => {

  const commands = loadCustomCommands();

  delete commands[req.params.name];

  saveCustomCommands(commands);

  res.json({
    success: true
  });
});

module.exports = router;
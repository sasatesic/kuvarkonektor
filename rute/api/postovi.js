const express = require("express");
const ruter = express.Router();

ruter.get("/", (req, res) => {
  res.json({
    bla: "bla"
  });
});

module.exports = ruter;

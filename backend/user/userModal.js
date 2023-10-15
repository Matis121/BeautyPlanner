const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  events: [],
  clients: [],
  services: [],
  activeHours: []
});

const User = mongoose.model("User", userSchema);

module.exports = User;

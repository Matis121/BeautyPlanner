const mongoose = require("mongoose");

const defaultActiveHours = [
  {
    dayName: "Poniedziałek",
    active: true,
    startTime: "10:00",
    endTime: "18:00",
    dayOfWeek: [1],
  },
  {
    dayName: "Wtorek",
    active: true,
    startTime: "10:00",
    endTime: "18:00",
    dayOfWeek: [2],
  },
  {
    dayName: "Środa",
    active: true,
    startTime: "10:00",
    endTime: "15:00",
    dayOfWeek: [3],
  },
  {
    dayName: "Czwartek",
    active: true,
    startTime: "10:00",
    endTime: "18:00",
    dayOfWeek: [4],
  },
  {
    dayName: "Piątek",
    active: true,
    startTime: "10:00",
    endTime: "18:00",
    dayOfWeek: [5],
  },
  {
    dayName: "Sobota",
    active: false,
    startTime: "",
    endTime: "",
    dayOfWeek: [6],
  },
  {
    dayName: "Niedziela",
    active: false,
    startTime: "",
    endTime: "",
    dayOfWeek: [0],
  },
];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  events: [],
  clients: [],
  services: [],
  activeHours: {
    default: defaultActiveHours,
    type: Array,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

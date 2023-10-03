const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());

// API
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

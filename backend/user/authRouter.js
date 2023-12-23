const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    return res.json({ username: req.user.username, id: req.user._id });
  }
});

authRouter.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
  });
  res.redirect("http://localhost:5173/");
});

module.exports = authRouter;

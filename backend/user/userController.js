const User = require("./userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "ilovechicken";

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ message: "Invalid username" });
  }

  if (password === user.password) {
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, secret);

    return res.json({ token, username: user.username, id: user._id });
  } else {
    return res.json({ message: "Incorrect password" });
  }
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  let user = new User({
    username,
    email,
    password,
  });

  const userExists = await User.findOne({ username: username }).exec();

  if (userExists) {
    res.json({
      error: "Username already taken.",
    });
  } else {
    user
      .save()
      .then(user => {
        res.json({
          success: "Account successfully created!",
        });
      })
      .catch(error => {
        res.json({
          error: "User failed to add",
          details: error.message,
        });
      });
  }
};

module.exports = {
  register,
  login,
};

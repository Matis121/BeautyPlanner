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

const addService = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { services: req.body.service } },
      { new: true }
    ).exec();

    if (user) {
      return res.json({ services: user.services });
    } else {
      return res.json({ error: "error adding client" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to add client.",
      details: error.message,
    });
  }
};

const getAllServices = async (req, res, next) => {
  const { username } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username }).exec(); // Znajdź użytkownika o określonej nazwie użytkownika

    if (user) {
      const services = user.services; // Pobierz wszystkie usługi z pola services

      return res.json({ services: services }); // Zwróć wszystkie usługi znalezione dla użytkownika
    } else {
      return res.json({ error: "User not found" }); // Zwróć błąd, jeśli użytkownik nie zostanie znaleziony
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve services.",
      details: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  addService,
  getAllServices,
};

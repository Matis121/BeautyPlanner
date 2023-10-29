const User = require("./userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "ilovechicken";

// LOGIN AND REGISTER
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

// SERVICES
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
      error: "Failed to add service",
      details: error.message,
    });
  }
};
const getAllServices = async (req, res, next) => {
  const { username } = req.query;
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
const removeService = async (req, res, next) => {
  const { username, serviceId } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      user.services = user.services.filter(service => service.id !== serviceId);
      await user.save();
      return res.json({ message: "Service removed successfully" });
    } else {
      return res.json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to remove service.", details: error.message });
  }
};
const editService = async (req, res, next) => {
  const { username, serviceId, updatedValue } = req.body;
  try {
    const filter = { username: username, "services.id": serviceId };
    const update = { $set: { "services.$": updatedValue } };
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).exec();

    if (user) {
      return res.json({ services: user.services });
    } else {
      return res.json({ error: "Service or user not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update service.",
      details: error.message,
    });
  }
};

//CLINETS
const addClient = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { clients: req.body.client } },
      { new: true }
    ).exec();

    if (user) {
      return res.json({ clients: user.clients });
    } else {
      return res.json({ error: "error adding client" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to add service",
      details: error.message,
    });
  }
};
const getClients = async (req, res, next) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username }).exec(); // Znajdź użytkownika o określonej nazwie użytkownika

    if (user) {
      const clients = user.clients; // Pobierz wszystkie usługi z pola services

      return res.json({ clients: clients }); // Zwróć wszystkie usługi znalezione dla użytkownika
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
const removeClient = async (req, res, next) => {
  const { username, clientId } = req.body;
  console.log(username, clientId);
  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      user.clients = user.clients.filter(client => client.id !== clientId);
      await user.save();
      return res.json({ message: "Client removed successfully" });
    } else {
      return res.json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to remove client.", details: error.message });
  }
};
const editClient = async (req, res, next) => {
  const { username, clientId, updatedValue } = req.body;
  try {
    const filter = { username: username, "clients.id": clientId };
    const update = { $set: { "clients.$": updatedValue } };
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).exec();

    if (user) {
      return res.json({ clients: user.clients });
    } else {
      return res.json({ error: "client or user not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update client.",
      details: error.message,
    });
  }
};

//ACTIVE HOURS
const editActiveHours = async (req, res, next) => {
  const { username, updatedValue } = req.body;
  console.log(updatedValue);
  try {
    const filter = { username: username };
    const update = { $set: { activeHours: updatedValue } };
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).exec();

    if (user) {
      return res.json({ activeHours: user.activeHours });
    } else {
      return res.json({ error: "client or user not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update activeHours.",
      details: error.message,
    });
  }
};
const getHours = async (req, res, next) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username }).exec(); // Znajdź użytkownika o określonej nazwie użytkownika

    if (user) {
      const activeHours = user.activeHours; // Pobierz wszystkie usługi z pola services

      return res.json({ activeHours: activeHours }); // Zwróć wszystkie usługi znalezione dla użytkownika
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

//EVENTS
const addEvent = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { events: req.body.event } },
      { new: true }
    ).exec();

    if (user) {
      return res.json({ events: user.events });
    } else {
      return res.json({ error: "error adding event" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to add service",
      details: error.message,
    });
  }
};
const getEvents = async (req, res, next) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username }).exec(); // Znajdź użytkownika o określonej nazwie użytkownika

    if (user) {
      const events = user.events; // Pobierz wszystkie usługi z pola services

      return res.json({ events: events }); // Zwróć wszystkie usługi znalezione dla użytkownika
    } else {
      return res.json({ error: "User not found" }); // Zwróć błąd, jeśli użytkownik nie zostanie znaleziony
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve events.",
      details: error.message,
    });
  }
};
const removeEvent = async (req, res, next) => {
  const { username, eventId } = req.body;
  console.log(username, eventId);
  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      user.events = user.events.filter(event => event.id !== eventId);
      await user.save();
      return res.json({ message: "Event removed successfully" });
    } else {
      return res.json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to remove client.", details: error.message });
  }
};

module.exports = {
  register,
  login,
  addService,
  getAllServices,
  removeService,
  editService,
  addClient,
  getClients,
  removeClient,
  editClient,
  editActiveHours,
  getHours,
  addEvent,
  getEvents,
  removeEvent,
};

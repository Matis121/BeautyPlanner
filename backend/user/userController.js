const User = require("./userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const secret = "ilovechicken";

// LOGIN || REGISTER || ACTIVATE ACCOUNT || NEW PASSWORD

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_LOGIN, // Zmień na swój adres e-mail
    pass: process.env.GMAIL_PASSWORD, // Zmień na hasło do twojego adresu e-mail
  },
});

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Sprawdź, czy użytkownik istnieje
    const userExists = await User.findOne({ username }).exec();
    if (userExists) {
      return res.json({ error: "Nazwa użytkownika jest już zajęta." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Zapisz użytkownika w bazie danych
    await user.save();

    // Generuj token aktywacyjny
    const activationToken = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "24h",
    });

    // Wyślij e-mail z linkiem aktywacyjnym
    const activationLink = `localhost:5000/activate/${activationToken}`;
    const mailOptions = {
      from: "mateusz6246@gmail.com",
      to: user.email,
      subject: "Potwierdzenie rejestracji",
      html: `<p>Kliknij w link aby aktytować konto: </p><a href="${activationLink}">${activationLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success:
        "Account successfully created! Check your email for activation instructions.",
    });
  } catch (error) {
    res.json({
      error: "User registration and activation failed",
      details: error.message,
    });
  }
};
const activateAccount = async (req, res, next) => {
  const { token } = req.params;

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;

    // Aktywuj konto użytkownika
    await User.findByIdAndUpdate(userId, { $set: { confirmed: true } });

    res.redirect("http://localhost:5173/login");
  } catch (error) {
    res.json({
      error: "Invalid or expired activation token.",
    });
  }
};
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.json({ message: "Invalid username" });
    }

    if (!user.confirmed) {
      return res.json({ message: "Please confirm your email to login" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const token = jwt.sign(payload, secret);

      return res.json({ token, username: user.username, id: user._id });
    } else {
      return res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    return res.json({ error: "Login failed", details: error.message });
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
const addVisitToClient = async (req, res, next) => {
  const { event } = req.body;
  const { username } = req.body;
  try {
    const user = await User.findOne({ username }).exec();

    if (user) {
      // Find the correct client using the clientId from the event
      const client = user.clients.find(client => client.id === event.clientId);

      if (client) {
        // Update the visits array using the positional operator $
        await User.updateOne(
          { username, "clients.id": event.clientId },
          { $push: { "clients.$.visits": event.id } }
        );

        // Fetch the updated user
        const updatedUser = await User.findOne({ username });

        // Return the updated events array
        return res.json({ events: updatedUser.events });
      } else {
        return res.json({ error: "Client not found" });
      }
    } else {
      return res.json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to add visit",
      details: error.message,
    });
  }
};
const removeVisitFromClient = async (req, res, next) => {
  const { eventId, clientId, username } = req.body;
  try {
    const user = await User.findOne({ username }).exec();

    if (user) {
      // Find the correct client using the clientId from the event
      const client = user.clients.find(client => client.id === clientId);

      if (client) {
        // Remove the specified visit (event.id) from the visits array
        await User.updateOne(
          { username, "clients.id": clientId },
          { $pull: { "clients.$.visits": eventId } }
        );

        // Fetch the updated user
        const updatedUser = await User.findOne({ username });

        // Return the updated events array
        return res.json({ events: updatedUser.events });
      } else {
        return res.json({ error: "Client not found" });
      }
    } else {
      return res.json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to remove visit",
      details: error.message,
    });
  }
};

//ACTIVE HOURS
const editActiveHours = async (req, res, next) => {
  const { username, updatedValue } = req.body;
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
  const { event } = req.body;
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
const finalizeEvent = async (req, res, next) => {
  const { username, eventId, finalizedEventData } = req.body;

  try {
    const filter = {
      username: username,
      "events.id": eventId,
    };

    const update = { $set: {} };

    // Iterate over the fields in finalizedEventData and set them individually
    for (const key in finalizedEventData) {
      update.$set[`events.$.${key}`] = finalizedEventData[key];
    }

    const options = {
      new: true,
    };

    const user = await User.findOneAndUpdate(filter, update, options).exec();

    if (user) {
      return res.json({ events: user.events });
    } else {
      return res.json({ error: "client or user not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to finalize event.",
      details: error.message,
    });
  }
};
const editEvent = async (req, res, next) => {
  const { username, eventId, updatedValue } = req.body;
  try {
    const filter = { username: username, "events.id": eventId };
    const update = { $set: { "events.$": updatedValue } };
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
  finalizeEvent,
  editEvent,
  addVisitToClient,
  removeVisitFromClient,
  activateAccount,
};

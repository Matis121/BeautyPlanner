require("dotenv").config();

const mongoconn = require("./database/mongoconn");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const session = require("express-session");
const passport = require("passport");

const userRouter = require("./user/userRouter");
const authRouter = require("./user/authRouter");
require("./user/passport");

// database connection
mongoconn();

// Use session to keep track of login state
app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Routers
app.use("/", userRouter);
app.use("/", authRouter);

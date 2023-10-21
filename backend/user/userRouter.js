const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/addService", userController.addService);
userRouter.get("/getServices", userController.getAllServices);

module.exports = userRouter;

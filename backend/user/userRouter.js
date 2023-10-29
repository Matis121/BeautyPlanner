const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
// Services
userRouter.get("/getServices", userController.getAllServices);
userRouter.post("/addService", userController.addService);
userRouter.delete("/removeService", userController.removeService);
userRouter.post("/editService", userController.editService);
// Clients
userRouter.post("/addClient", userController.addClient);
userRouter.get("/getClients", userController.getClients);
userRouter.delete("/removeClient", userController.removeClient);
userRouter.post("/editClient", userController.editClient);
// Events
userRouter.get("/getEvents", userController.getEvents);
userRouter.post("/addEvent", userController.addEvent);
userRouter.delete("/removeEvent", userController.removeEvent);
// Active hours
userRouter.get("/getHours", userController.getHours);
userRouter.post("/editActiveHours", userController.editActiveHours);

module.exports = userRouter;

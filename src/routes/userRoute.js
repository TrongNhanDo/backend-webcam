import express from "express";
import * as UserController from "../controllers/UserControllers.js";

const userRoute = express.Router();

userRoute.get("/", UserController.getAllUsers);
userRoute.post("/", UserController.register);
userRoute.post("/login", UserController.login);
userRoute.post("/get-user-info", UserController.getUserInfo);

export default userRoute;

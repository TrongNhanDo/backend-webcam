import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import dotenv from "dotenv";
import mainRoute from "./src/routes/index.js";
import socketIO from "./src/controllers/SocketControllers.js";
import connectDB from "./src/config/dbConnection.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

mainRoute(app);

connectDB();

const server = createServer(app);
socketIO(server);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

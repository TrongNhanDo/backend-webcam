import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import homeRoute from "./homeRoute.js";
import userRoute from "./userRoute.js";

const mainRoute = (app) => {
  app.use(morgan("combined"));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use("/", homeRoute);
  app.use("/users", userRoute);
};

export default mainRoute;

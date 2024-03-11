import md5 from "md5";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().exec();
    if (users) {
      return res.json({
        users,
        bizResult: "0",
        errors: [],
      });
    }

    return res.json({
      bizResult: "8",
      errors: [],
    });
  } catch (error) {
    return res.status(500).json({ error, message: "Server's error" });
  }
};

export const login = async (req, res) => {
  try {
    const params = req.body;
    const user = await UserModel.findOne({
      username: params.username,
      password: md5(params.password),
      roleId: 1,
    })
      .select("-password")
      .exec();

    if (user) {
      const formatUser = user.toJSON();
      const accessToken = jwt.sign(formatUser, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(formatUser, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "30d",
      });

      const updateUser = await UserModel.updateOne(
        {
          _id: user._id.toString(),
        },
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
      );

      if (updateUser) {
        return res.json({
          bizResult: "0",
          errors: [],
        });
      }

      return res.json({
        bizResult: "8",
        errors: [{ message: "Update user's token fail" }],
      });
    } else {
      return res.json({
        bizResult: "8",
        errors: [{ message: "Username or password is incorrect!" }],
      });
    }
  } catch (error) {
    throw error;
    return res.status(500).json({ errors: [error], message: "Server's error" });
  }
};

export const register = async (req, res) => {
  try {
    // get params from request's body
    const params = req.body;
    // check for duplicate
    const duplicate = await UserModel.findOne({
      username: params.username,
    }).exec();

    if (duplicate) {
      return res.json({
        bizResult: "8",
        errors: [{ message: "Username already existed" }],
      });
    }

    const userObject = {
      username: params.username,
      password: md5(params.password),
      roleId: params.roleId || 1,
    };
    // create and store new user
    const user = await UserModel.create(userObject);
    if (user) {
      // created
      return res.json({
        bizResult: "0",
        errors: [],
      });
    } else {
      return res.json({
        bizResult: "8",
        errors: [{ message: "Create user fail" }],
      });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "Server's error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const token = req.headers["authorization"] || req.headers["x-access-token"];
    if (!token) {
      return res.json({
        bizResult: "8",
        errors: [{ message: "Access denied. No token provide." }],
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
      if (err) {
        return res.json({
          bizResult: "8",
          errors: [{ message: "Invalid token" }],
        });
      }

      return res.json({
        bizResult: "0",
        userInfo: decode,
      });
    });
  } catch (error) {
    throw error;
  }
};

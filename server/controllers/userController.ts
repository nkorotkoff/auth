import asyncHandler from "express-async-handler";
import express from "express";
import { default as bcrypt } from "bcryptjs";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import {
  requestPasswordReset,
  resetPassword,
} from "./../services/resetPassword";
const maxAge = 3 * 24 * 60 * 60;
export const registerUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { login, email, password }: IUser = req.body;

    if (!login || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ login, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: user.id,
        login: user.login,
        email: user.email.toLowerCase(),
      });
    } else {
      throw new Error("invalid user data");
    }
  }
);

export const loginUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    console.log("trying sign in");
    console.log(req.body);
    const { login, password }: IUser = req.body;
    if (!login || !password) {
      res.status(400);
      throw new Error("All field are required");
    }
    const user = await User.findOne({ login });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie("jwt", generateToken(user._id), {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: "lax",
      });
      res.status(201).json({
        _id: user.id,
        login: user.login,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  }
);
export const resetPasswordRequestController = async (
  req: express.Request,
  res: express.Response
) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};
export const resetPasswordController = async (
  req: express.Request,
  res: express.Response
) => {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

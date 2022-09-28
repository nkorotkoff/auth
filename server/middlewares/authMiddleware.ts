import * as jwt from "jsonwebtoken";
import express from "express";
import User, { IUser } from "../models/userModel";

export const requireAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  }
};

export const checkUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      async (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          res.status(400).json("Json web token is invalid");
          //   next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) {
            res.status(200).json({
              _id: user.id,
              login: user.login,
            });
            // next();
          } else {
            res.status(400);
            throw new Error("User not found");
          }
        }
      }
    );
    // next();
  } else {
    res.status(400);
    throw new Error("JWT Invalid");
  }
};

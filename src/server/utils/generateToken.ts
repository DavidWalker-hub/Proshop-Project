import Express from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../models/userModel";

export const generateToken = (res: Express.Response, userId: IUser["_id"]) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: "30d",
  });

  //   set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

import Express from "express";
import jwt, { Secret } from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler";
import User from "../models/userModel";

// protect routes
export const protect = asyncHandler(
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    let token;

    // read the jwt from the cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: jwt.JwtPayload = jwt.verify(
          token,
          process.env.JWT_SECRET as Secret
        ) as jwt.JwtPayload;
        const user = await User.findById(decoded.userId).select("-password");
        if (user) {
          req.user = user;
        } else {
          res.status(401);
          throw new Error("Not authorized, token failed");
        }
        next();
      } catch (error) {
        console.log("error from token try catch", error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

// Admin middleware
export const admin = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

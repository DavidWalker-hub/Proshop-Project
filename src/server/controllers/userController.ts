import Express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

// @desc Auth user & get token
// @route POST /api/users/login
// Public
export const loginUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
);

// @desc Register user
// @route POST /api/users
// Public
export const registerUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @desc logout user & clear cookie
// @route POST /api/users/logout
// private
export const logoutUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  }
);

// @desc Get user profile
// @route GET /api/users/profile
// private
export const getUserProfile = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const user = await User.findById(req.user?._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// @desc update user profile
// @route PUT /api/users/profile
// private
export const updateUserProfile = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// @desc get all users
// @route GET /api/users
// private/admin
export const getUsers = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("get all users");
  }
);

// @desc get  user by id
// @route GET /api/users/:id
// private/admin
export const getUserById = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("get user by Id");
  }
);

// @desc delete user
// @route DELETE /api/users/:id
// private/admin
export const deleteUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("delete user");
  }
);

// @desc update user
// @route PUT /api/users/:id
// private/admin
export const updateUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("update user");
  }
);

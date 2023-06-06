import Express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import User from "../models/userModel";

// @desc Auth user & get token
// @route POST /api/users/login
// Public
export const loginUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    res.send(`login user ${req.body}`);
  }
);

// @desc Register user
// @route POST /api/users
// Public
export const registerUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("register user");
  }
);

// @desc logout user & clear cookie
// @route POST /api/users/logout
// private
export const logoutUser = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("logout user");
  }
);

// @desc Get user profile
// @route GET /api/users/profile
// private
export const getUserProfile = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("get user profile");
  }
);

// @desc update user profile
// @route PUT /api/users/profile
// private
export const updateUserProfile = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    res.send("update user profile");
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

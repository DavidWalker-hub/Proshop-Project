import Express from "express";
import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController";

const router = Express.Router();

router.route("/").post(registerUser).get(getUsers);

router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;

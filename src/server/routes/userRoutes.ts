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
import { admin, protect } from "../middleware/authMiddleware";

const router = Express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/logout", logoutUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;

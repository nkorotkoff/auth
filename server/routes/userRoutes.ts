import express from "express";
import {
  loginUser,
  registerUser,
  resetPasswordRequestController,
  resetPasswordController,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);

export default router;

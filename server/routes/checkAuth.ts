import express from "express";
import { checkUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", checkUser);

export default router;

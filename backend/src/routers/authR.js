import express from "express";
import authController from "../controllers/authC.js";

const router = express.Router();

router
  .post("/register", authController.authRegister)
  .post("/login", authController.authLogin);

export default router;

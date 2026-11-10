import express from "express";
import authController from "../controllers/authC.js";
import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router
  .post("/register", authMiddleware.registerPage, authController.authRegister)
  .post("/login", authController.authLogin);

export default router;

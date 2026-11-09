import express from "express";
import authController from "../controllers/authC.js";
import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router
  .post("/register", authMiddleware.regiterPage, authController.authRegister)
  .post("/login", authController.authLogin);

export default router;

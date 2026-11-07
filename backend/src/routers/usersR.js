import express from "express";
import getAllUsers from "../controllers/usersC.js";

const router = express.Router();

router.get("/users", getAllUsers);

export default router;

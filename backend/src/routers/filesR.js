import express from "express";
import getAllFiles from "../controllers/filesC.js";

const router = express.Router();

router.get("/files", getAllFiles);

export default router;

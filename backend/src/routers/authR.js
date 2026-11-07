import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import { join } from "path";

const router = express.Router()

router.get("/", (req, res) => {
    res.send("xammasi yaxshi")
})

export default router
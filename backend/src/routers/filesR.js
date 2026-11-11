import express from "express";
import filesController from "../controllers/filesC.js";
// import filesMiddlewate from "../middleware/filesM.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();

router
  .get("/files", filesController.getAllFiles)
  .post("/files", checkToken, filesController.addNewFile)
  .delete("/files", filesController.deleteFile)
  .put("/files", filesController.updateFileName)
  .get("/files/:userId", filesController.getFilesById);

export default router;

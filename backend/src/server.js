import express from "express";
import cors from "cors";
import { join } from "path";
import fileUpload from "express-fileupload";
import authRouter from "./routers/authR.js";
import usersRouter from "./routers/usersR.js";
import filesRouter from "./routers/filesR.js";
// import "dotenv/config.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
app.use(cors("http://127.0.0.1:5500"));
app.use("/uploads", express.static(join(process.cwd(), "src", "uploads")));
app.use(express.json());
app.use(fileUpload());
app.use(authRouter);
app.use(usersRouter);
app.use(filesRouter);

app.get("/", (req, res) => {
  res.send("xammasi yaxshi");
});

app.listen(process.env.PORT, () => console.log("server is running..."));

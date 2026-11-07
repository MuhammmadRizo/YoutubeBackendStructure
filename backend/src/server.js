import express from "express";
import fileUpload from "express-fileupload";
import authRouter from "./routers/authR.js";
import usersRouter from "./routers/usersR.js";
import filesRouter from "./routers/filesR.js";

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(authRouter);
app.use(usersRouter);
app.use(filesRouter);

app.get("/", (req, res) => {
  res.send("xammasi yaxshi");
});

app.listen(5050, () => console.log("server is running..."));

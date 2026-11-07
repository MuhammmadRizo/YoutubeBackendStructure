import express from "express"
import authRouter from "./routers/authR.js"

const app = express()
app.use(express.json())
app.use(authRouter)

app.listen(5050, () => console.log("server is running..."))
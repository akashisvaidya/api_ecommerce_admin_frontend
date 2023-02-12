import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());

//db connect
import { connectDb } from "./src/config/dbConfig.js";
connectDb();

//routers

import adminRouter from "./src/routers/adminRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/", (req, res) => {
  res.json({
    message: "You do not have access here",
  });
});

///error handlers
app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 404;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});

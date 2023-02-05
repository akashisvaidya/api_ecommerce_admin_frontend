import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());

//routers
app.use("/", (req, res) => {
  res.json({
    message: "You do not have access here",
  });
});
///error handlers

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});

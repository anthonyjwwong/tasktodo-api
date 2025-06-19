import express from "express";
import { connectDB } from "./lib/db.js";
import todosRoute from "./routes/todos.route.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/todos", todosRoute);

app.listen(PORT, () => {
  console.log("Server is running on port 5001");
  connectDB();
});

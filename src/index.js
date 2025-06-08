import express from "express";
import { connectDB } from "./lib/db.js";
import todosRoute from "./routes/todos.route.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Enable CORS for all routes

app.use("/api/todos", todosRoute);

app.listen(PORT, () => {
  console.log("Server is running on port 5001");
  connectDB();
});

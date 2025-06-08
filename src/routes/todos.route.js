import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todos.controller.js";
const router = express.Router();

//get all todos
router.get("/", getTodos);

//Create a new todo
router.post("/", createTodo);

//update a specific todo
router.put("/:id", updateTodo);

//delete a todo
router.delete("/:id", deleteTodo);

export default router;

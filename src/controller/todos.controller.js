//The controller for the different todos route

import Todo from "../models/todos.model.js";

//Get todo
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
//create todo
export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });

    if (!newTodo.text)
      return res
        .status(400)
        .json({ message: "Please do not leave the text field empty" });

    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (error) {
    console.log("Error in creating new todo: ", error.message);
  }
};

//Update Todo
export const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    console.log("Error in updating the new message", error.message);
  }
};
//Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedItem = await Todo.findByIdAndDelete(todoId);

    if (deletedItem) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.log("Error in deleting Todo:", error.message);
    res.status(500).json({ message: "Server error while deleting item" });
  }
};

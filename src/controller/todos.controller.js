//The controller for the different todos route

import Todo from "../models/todos.model.js";

export const getTodos = async (req, res) => {
  try {
    //Filter Function
    const filter = {};

    //consoel.log returns
    //Get /api/todos?category=work&priority=high returns
    // Filter Object: { category: 'work', priority: 'high' }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.completed !== undefined) {
      let complete = req.query.completed == "true" ? true : false;
      filter.completed = complete;
    }
    //Search for matching the pattern
    if (req.query.search) {
      const regex = new RegExp(req.query.search, "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    //Sort Function - sortBy = topic, sortOrder = asc,desc

    const sort = {};

    const sortTopic = req.query.sortBy || "createdAt";
    const sortDirection = req.query.sortOrder === "asc" ? 1 : -1;

    sort[sortTopic] = sortDirection;

    const todos = await Todo.find(filter).sort(sort);

    //Priority - Convert Num to String [ 1 - low, 2 - medium, 3 - high]
    const priorityToString = {
      1: "low",
      2: "medium",
      3: "high",
    };

    //Can't directly modify mongoose docs so convert to regular object
    const transformedTodos = todos.map((todo) => ({
      ...todo.toObject(),
      priority: priorityToString[todo.priority],
    }));

    res.status(200).json(transformedTodos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
//create todo
export const createTodo = async (req, res) => {
  try {
    const { title, category, priority, dueDate, description } = req.body;

    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please do not leave this field empty." });
    }

    const validCategories = ["work", "personal", "shopping", "goals"];

    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid Category, Must be: work, personal, shopping, goals",
      });
    }

    //Priority
    const stringToPriority = {
      high: 3,
      medium: 2,
      low: 1,
    };

    const validPriorityStrings = ["high", "medium", "low"];

    if (priority && !validPriorityStrings.includes(priority)) {
      return res.status(400).json({
        message: "Invalid Priority, Must be: high, medium, low",
      });
    }

    const priorityToNum = priority ? stringToPriority[priority] : 2; //default medium

    const newTodo = new Todo({
      title: title.trim(),
      category: category || "personal",
      priority: priorityToNum,
      dueDate: dueDate ? new Date(dueDate) : null,
      description: description || "",
    });

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

//get number of todos

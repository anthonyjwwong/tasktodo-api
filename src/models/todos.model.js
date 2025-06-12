import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      // Keep existing field name
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // NEW FIELDS - safe to add
    category: {
      type: String,
      enum: ["work", "personal", "shopping", "goals"],
      default: "personal",
    },
    priority: {
      type: Number,
      enum: [1, 2, 3], // 1=low, 2=medium, 3=high
      default: 2, // medium as default
    },
    dueDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;

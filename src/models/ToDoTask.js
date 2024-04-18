const mongoose = require("mongoose");
const toDoTaskSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const ToDoTask = mongoose.model("ToDoTask", toDoTaskSchema);
module.exports = ToDoTask;

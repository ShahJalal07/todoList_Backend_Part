const todomodel = require("../models/ToDoTask");

// create task model start
exports.createTask = async (req, res) => {
  try {
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    // console.log(req.headers.email)
    const newTask = await todomodel.create(reqBody);
    res.status(200).json({
      status: "success",
      data: newTask,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// create task model end

// update task model start
exports.updateTask = async (req, res) => {
  try {
    const params = req.params.id;
    const status = req.params.status;
    const query = { _id: params };
    const todo = await todomodel.updateOne(query, { status: status });
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// update task model end

// update by id start
exports.updateById = async (req, res) => {
  try {
    const params = req.params.id;
    const reqBody = req.body;
    const query = { _id: params };
    const todo = await todomodel.updateOne(query, reqBody);
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// update by id end

// delete task model start
exports.deleteTask = async (req, res) => {
  try {
    const params = req.params.id;
    const query = { _id: params };
    const todo = await todomodel.deleteOne(query);
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// delete task model end

// todo list status start
exports.statusCount = async (req, res) => {
  try {
    const status = req.params.status;
    const email = req.headers.email;
    const result = await todomodel.aggregate([
      { $match: { status: status, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,

          date: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },

          time: { $dateToString: { format: "%H:%M:%S", date: "$date" } },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// todo list status end

// todo list count start
exports.count = async (req, res) => {
  try {
    const email = req.headers.email;
    const result = await todomodel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$status", total: { $count: {} } } },
    ]);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// todo list count end

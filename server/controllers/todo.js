const TodoSchema = require("../models/todo");

const getAllTodo = async (req, res) => {
  try {
    const todo = await TodoSchema.find({});
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const createTodo = async (req, res) => {
  try {
    const todo = await TodoSchema.create(req.body);
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const getOneTodo = async (req, res) => {
  try {
    const { TodoID: todoId } = req.params;
    const todo = await TodoSchema.findOne({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ message: "Todo does not Exist !!!" });
    }

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const updateTodo = async (req, res) => {
  try {
    const { TodoID: todoID } = req.params;
    const todo = await TodoSchema.findByIdAndUpdate({ _id: todoID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.statusnode(404).json({ messgae: "No Todos with that ID" });
    }
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { TodoID: todoID } = req.params;
    const todo = await TodoSchema.findByIdAndDelete({ _id: todoID });

    if (!todo) {
      return res.status(404).json({ messgae: "No Todos with that ID" });
    }

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllTodo,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
};

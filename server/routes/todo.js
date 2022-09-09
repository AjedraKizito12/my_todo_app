const express = require("express");
const router = express.Router();

const {
  getAllTodo,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

router.route("/").get(getAllTodo).post(createTodo);
router.route("/:TodoID").get(getOneTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;

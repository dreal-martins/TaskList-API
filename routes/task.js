const express = require("express");
const router = express.Router();

const {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} = require("../controllers/task");

router.route("/").post(createTask).get(getAllTasks);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;

const { NotFoundError, BadRequestError } = require("../errors");
const Task = require("../models/Task");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    res.status(200).json({ tasks, count: tasks.length });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;
    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      throw new NotFoundError(`No job with id ${taskId}`);
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(201).json({ msg: "Task created successfully", task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const {
      body: { name, description },
      user: { userId },
      params: { id: taskId },
    } = req;

    if (name === "" || description === "") {
      throw new BadRequestError("Name or Description fields cannot be empty");
    }

    const task = await Task.findByIdAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new NotFoundError(`No job with id ${taskId}`);
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;

    const task = await Task.findByIdAndDelete({
      _id: taskId,
      createdBy: userId,
    });

    if (!task) {
      throw new NotFoundError(`No job with id ${taskId}`);
    }
    res.status(200).json({ msg: "delete task successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };

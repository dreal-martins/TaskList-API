const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
    maxlength: 255,
    minlenght: 3,
  },
  description: {
    type: String,
    require: [true, "Please provide a description"],
    maxlength: 255,
    minlenght: 3,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Provide A name"],
      trim: true,
      maxlength: [50, "Name must be less than 50 characters"],
    },
    comment: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", TodoSchema);

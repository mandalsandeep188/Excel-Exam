const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    optionA: {
      type: String,
    },
    optionB: {
      type: String,
    },
    optionC: {
      type: String,
    },
    optionD: {
      type: String,
    },
    correct: {
      type: String,
      required: true,
    },
    standard: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Question", questionSchema);

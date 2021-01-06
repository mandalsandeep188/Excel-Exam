const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;

const resultSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Practice", //set up
  },
  correct: {
    type: Number,
  },
  wrong: {
    type: Number,
  },
  unattempt: {
    type: Number,
  },
  questions: [{ type: Object }],
  answers: { type: Object },
  user: { type: ObjectID, ref: "User" },
});

mongoose.model("Result", resultSchema);

const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;

const resultSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Practice",
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
    onModel: {
      type: String,
      default: "User",
      enum: ["User", "SocialUser"],
    },
    startTime: {
      type: String,
    },
    questions: [{ type: Object }],
    answers: { type: Object },
    user: { type: ObjectID, refPath: "onModel" },
  },
  { timestamps: true }
);

mongoose.model("Result", resultSchema);

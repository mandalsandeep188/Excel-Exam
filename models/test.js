const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [{ type: ObjectID, ref: "Question" }],
    startTime: {
      type: String,
      required: true,
    },
    results: [{ type: ObjectID, ref: "Result" }],
  },
  { timestamps: true }
);

mongoose.model("Test", testSchema);

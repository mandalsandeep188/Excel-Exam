const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default: "user.jpeg",
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "student",
  },
  results: [{ type: ObjectID, ref: "Result" }],
});

mongoose.model("User", questionSchema);

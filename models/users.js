const mongoose = require("mongoose");

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
    default: "Student",
  },
});

mongoose.model("User", questionSchema);

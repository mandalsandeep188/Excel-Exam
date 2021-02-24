const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
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
  type: {
    type: String,
    default: "Student",
  },
});

mongoose.model("SocialUser", socialSchema);

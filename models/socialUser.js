const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;

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
    default: "student",
  },
  results: [{ type: ObjectID, ref: "Result" }],
});

mongoose.model("SocialUser", socialSchema);

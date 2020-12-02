const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/register", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ err: "Please fill all fields" });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
  });

  let user = null;

  if (pic) {
    user = new User({
      name,
      email,
      password,
      pic,
    });
  } else {
    user = new User({
      name,
      email,
      password,
    });
  }

  user
    .save()
    .then(() => {
      res.json({ message: "Registered successfully" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

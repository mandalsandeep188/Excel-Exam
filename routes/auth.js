const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const SocialUser = mongoose.model("SocialUser");
const { JWT_SECRET } = require("../config/key");

router.post("/register", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ err: "Please fill all fields" });
  }

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
    .then((data) => {
      const token = jwt.sign({ _id: data._id }, JWT_SECRET);
      const { _id, name, email, pic, type } = data;
      res.json({
        token,
        user: { _id, name, email, pic, type },
        message: "Registered successfully",
      });
    })
    .catch((err) => console.log(err));
});

router.post("/checkEmail", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({ error: "User already exists with that email" });
    } else {
      return res.json({ error: null });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "Please fill all fields" });
  }

  User.findOne({ email })
    .then((saveduser) => {
      if (!saveduser) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      if (saveduser.password === password) {
        const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET);
        const { _id, name, email, pic, type } = saveduser;
        res.json({ token, user: { _id, name, email, pic, type } });
      } else {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/socialLogin", (req, res) => {
  const { id, name, email, pic } = req.body;
  if (!id || !name || !email) {
    return res.status(422).json({ err: "Something went wrong" });
  }

  SocialUser.findOne({ id: id }).then((user) => {
    if (user) {
      return res.json({ _id: user._id, type: user.type });
    } else {
      let usr = new SocialUser({
        id,
        name,
        email,
        pic,
      });
      usr
        .save()
        .then((data) => {
          res.json({ _id: data._id, type: data.type });
        })
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;

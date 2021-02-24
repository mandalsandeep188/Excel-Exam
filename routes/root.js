const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Test = mongoose.model("Test");
const User = mongoose.model("User");
const SocialUser = mongoose.model("SocialUser");

router.get("/getUsers", (req, res) => {
  let arr = [];
  User.find()
    .select("-password")
    .then((users) => {
      arr = [...users];
      SocialUser.find().then((usrs) => {
        arr = [...arr, ...usrs];
        res.json({ users: arr });
      });
    });
});

router.get("/getTests", (req, res) => {
  Test.find()
    .select("-questions")
    .populate([
      {
        path: "results",
        model: "Result",
        select: "correct wrong onModel",
        populate: {
          path: "user",
          select: "name email",
        },
      },
    ])
    .then((tests) => {
      let data;

      res.json(tests);
    });
});

router.post("/deleteTest", (req, res) => {
  const { testID } = req.body;

  Test.findByIdAndDelete(testID).then((data) => {
    res.json({ msg: "success" });
  });
});

router.post("/changeRole", (req, res) => {
  const { userID, role } = req.body;
  User.findByIdAndUpdate(userID, { type: role })
    .then((data) => {
      if (!data) {
        SocialUser.findByIdAndUpdate(userID, { type: role }).then((data) => {
          res.json({ msg: "success" });
        });
      } else {
        res.json({ msg: "success" });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
});

module.exports = router;

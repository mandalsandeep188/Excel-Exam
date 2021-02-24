const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Result = mongoose.model("Result");
const Test = mongoose.model("Test");

router.post("/saveResult", (req, res) => {
  const {
    title,
    correct,
    wrong,
    unattempt,
    questions,
    user,
    answers,
    testID,
    startTime,
    userModel,
  } = req.body;
  let result = new Result({
    title,
    correct,
    wrong,
    unattempt,
    questions,
    user,
    answers,
    startTime,
    onModel: userModel,
  });
  result.save().then((res) => {
    if (testID) {
      Test.findByIdAndUpdate(testID, {
        $push: { results: res._id },
      }).then(() => console.log("Test result saved"));
    }
  });
});

router.get("/getResults/:userID", (req, res) => {
  Result.find({ user: req.params.userID })
    .sort("-createdAt")
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/seeResult/:resID", (req, res) => {
  Result.findById(req.params.resID)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

module.exports = router;

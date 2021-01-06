const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Result = mongoose.model("Result");

router.post("/saveResult", (req, res) => {
  const { correct, wrong, unattempt, questions, user, answers } = req.body;
  let result = new Result({
    correct,
    wrong,
    unattempt,
    questions,
    user,
    answers,
  });
  result.save().then(() => console.log("Result saved"));
});

router.get("/getResults:userID", (req, res) => {});

module.exports = router;

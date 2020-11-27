const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = mongoose.model("Question");

router.post("/addQuestion", (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correct,
    standard,
    subject,
    chapter,
  } = req.body;

  if (!question || !correct || !standard || !subject || !chapter) {
    return res.status(422).json({ err: "Please fill all fields" });
  }

  let ques;
  if (optionA && optionB && optionC && optionD) {
    ques = new Question({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correct,
      standard,
      subject,
      chapter,
    });
  } else {
    ques = new Question({
      question,
      correct,
      standard,
      subject,
      chapter,
    });
  }

  ques
    .save()
    .then((result) => {
      res.json({ question: result });
    })
    .catch((err) => console.log(err));
});

router.get("/fetchQuestions", (req, res) => {
  Question.find().then((questions) => res.json(questions));
});

module.exports = router;

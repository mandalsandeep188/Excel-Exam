const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = mongoose.model("Question");
const Test = mongoose.model("Test");

router.post("/practice", (req, res) => {
  const { standard, subject, selectedChapter, noOfQuestions } = req.body;

  if (selectedChapter.length === 0) {
    //if no selectedChapters selected
    if (subject.length === 0) {
      //if no subject selected
      if (standard.length === 0) {
        // if neither standard, selectedChapter nor subject selected
        Question.aggregate([
          {
            $sample: { size: parseInt(noOfQuestions) },
          },
        ])
          .then((data) => {
            res.json({ questions: data });
          })
          .catch((err) => console.log(err));
      } else {
        // only standard selected
        Question.aggregate([
          {
            $match: {
              standard: { $in: standard },
            },
          },
          { $sample: { size: parseInt(noOfQuestions) } },
        ])
          .then((data) => {
            res.json({ questions: data });
          })
          .catch((err) => console.log(err));
      }
    } else {
      // if subjected selected
      if (standard.length === 0) {
        // if subject selected but no standard selected
        Question.aggregate([
          {
            $match: {
              subject: { $in: subject },
            },
          },
          { $sample: { size: parseInt(noOfQuestions) } },
        ])
          .then((data) => {
            res.json({ questions: data });
          })
          .catch((err) => console.log(err));
      } else {
        //if standard and subject selected
        Question.aggregate([
          {
            $match: {
              standard: { $in: standard },
              subject: { $in: subject },
            },
          },
          { $sample: { size: parseInt(noOfQuestions) } },
        ])
          .then((data) => {
            res.json({ questions: data });
          })
          .catch((err) => console.log(err));
      }
    }
  } else {
    //if selectedChapters selected
    Question.aggregate([
      {
        $match: {
          chapter: { $in: selectedChapter },
          standard: { $in: standard },
          subject: { $in: subject },
        },
      },
      { $sample: { size: parseInt(noOfQuestions) } },
    ]).then((data) => {
      res.json({ questions: data });
    });
  }
});

router.post("/maketest", (req, res) => {
  const { questions, title, startTime } = req.body;

  let test = new Test({
    title,
    questions,
    startTime,
  });

  test
    .save()
    .then((data) => res.json({ data: data }))
    .catch((err) => res.json({ err: err }));
});

router.get("/fetchTests", (req, res) => {
  Test.find()
    .populate("questions")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;

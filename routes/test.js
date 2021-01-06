const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Test = mongoose.model("Test");

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

import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { QuestionContext } from "../App";

export default function Result() {
  const { state, dispatch } = useContext(QuestionContext);
  const [result, setResult] = useState({
    marks: 0,
    correct: 0,
    wrong: 0,
    unattempt: 0,
  });
  useEffect(() => {
    if (state) {
      console.log(state);
      let marks = 0;
      let correct = 0;
      let wrong = 0;
      let unattempt = 0;
      state.selectedQuestions.forEach((question, i) => {
        if (
          state.answers[`${i}`] &&
          question.correct === state.answers[`${i}`]
        ) {
          marks += 4;
          correct++;
        } else if (state.answers[`${i}`]) {
          marks -= 1;
          wrong++;
        } else {
          unattempt++;
        }
      });
      setResult({ marks, correct, wrong, unattempt });
    }
  }, []);
  return (
    <>
      <div className="container-fluid">
        <h1>Result</h1>
        <ul>
          <li>Marks : {result.marks}</li>
          <li>Correct : {result.correct}</li>
          <li>Wrong : {result.wrong}</li>
          <li>Unattempted : {result.unattempt}</li>
        </ul>
      </div>
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { QuestionContext } from "../App";
import { UserContext } from "../App";
import { Chart } from "chart.js";

export default function Result() {
  const { state } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (state) {
      console.log(state);
      let marks = 0;
      let correct = 0;
      let wrong = 0;
      let unattempt = 0;
      let ans = [];
      state.selectedQuestions.forEach((question, i) => {
        if (
          state.answers[`${i}`] &&
          question.correct === state.answers[`${i}`]
        ) {
          marks += 4;
          correct++;
          ans.push(state.answers[`${i}`]);
        } else if (state.answers[`${i}`]) {
          marks -= 1;
          wrong++;
          ans.push(state.answers[`${i}`]);
        } else {
          unattempt++;
          ans.push(null);
        }
      });
      setResult({ marks, correct, wrong, unattempt });
      setAnswers(ans);
    }
  }, []);

  // double saving and social id problem
  useEffect(() => {
    if (result) {
      var ctx = document.getElementById("resultChart");
      let data = {
        datasets: [
          {
            data: [result.correct, result.wrong, result.unattempt],
            backgroundColor: ["green", "red", "yellow"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Correct", "Wrong", "Unattempted"],
      };
      let myDoughnutChart = new Chart(ctx, {
        type: "pie",
        data: data,
        options: {},
      });

      fetch("/saveResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correct: result.correct,
          wrong: result.wrong,
          unattempt: result.unattempt,
          user: user._id,
          questions: state.selectedQuestions,
          answers: state.answers,
        }),
      });
    }
  }, [result]);

  return (
    <>
      <div className="container my-3">
        {result ? (
          <div className="row">
            <div className="col-md-3 filter">
              <h4>Result</h4>
              <p>
                <b>Total correct:</b> {result.correct}{" "}
                <span className="text-success">(+{result.correct * 4})</span>
              </p>
              <p className="">
                <b>Total wrong:</b> {result.wrong}{" "}
                <span className="text-danger">(-{result.wrong})</span>
              </p>
              <p className="">
                <b>Not attempted:</b>{" "}
                <span className=" text-info">{result.unattempt}</span>
              </p>
              <p className="">
                <b>Total marks:</b>{" "}
                <span className="text-primary">{result.marks}</span>
              </p>
              <hr />
              <canvas id="resultChart" width="400" height="400"></canvas>
            </div>
            <div className="col-md-8 result-question">
              {state && answers
                ? state.selectedQuestions.map((ques, index) => {
                    return (
                      <>
                        <div className="q-no">Question No.{index + 1}) </div>
                        {ques.question.search("https://") !== -1 ? (
                          <img
                            className="ques-img img-fluid"
                            src={ques.question}
                          />
                        ) : (
                          <>
                            <p className="ques-p">{ques.question}</p>
                            <div className="row options">
                              <div className="col-md-5">
                                <span>A) </span> {ques.optionA}
                              </div>
                              <div className="col-md-5">
                                <span>B) </span> {ques.optionB}
                              </div>
                              <div className="col-md-5">
                                <span>C) </span> {ques.optionC}
                              </div>
                              <div className="col-md-5">
                                <span>D) </span> {ques.optionD}
                              </div>
                            </div>
                          </>
                        )}
                        <div className="row select-options gy-1">
                          <div className="col-md-6">
                            <div
                              className={`bg-${
                                ques.correct === "Option A"
                                  ? "success"
                                  : answers[index]
                                  ? answers[index] === "Option A"
                                    ? "danger"
                                    : "primary"
                                  : "primary"
                              } check-ans`}
                            >
                              Option A
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div
                              className={`bg-${
                                ques.correct === "Option B"
                                  ? "success"
                                  : answers[index]
                                  ? answers[index] === "Option B"
                                    ? "danger"
                                    : "primary"
                                  : "primary"
                              } check-ans pd-3`}
                            >
                              Option B
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div
                              className={`bg-${
                                ques.correct === "Option C"
                                  ? "success"
                                  : answers[index]
                                  ? answers[index] === "Option C"
                                    ? "danger"
                                    : "primary"
                                  : "primary"
                              } check-ans`}
                            >
                              Option C
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div
                              className={`bg-${
                                ques.correct === "Option D"
                                  ? "success"
                                  : answers[index]
                                  ? answers[index] === "Option D"
                                    ? "danger"
                                    : "primary"
                                  : "primary"
                              } check-ans`}
                            >
                              Option D
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : undefined}
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center loader">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}
      </div>
    </>
  );
}

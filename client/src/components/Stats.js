import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { UserContext } from "../App";
import { Chart } from "chart.js";

export default function Stats(props) {
  const { user } = useContext(UserContext);
  const [stat, setStat] = useState(null);
  useEffect(() => {
    let correct = 0;
    let questions = 0;
    let wrong = 0;
    let unattempt = 0;

    let correctPoints = [];
    let wrongPoints = [];
    let unattemptPoints = [];
    let labels = [];

    props.results.forEach((result) => {
      correct += result.correct;
      questions += result.correct + result.wrong;
      wrong += result.wrong;
      unattempt += result.unattempt;
      correctPoints.push(result.correct);
      wrongPoints.push(result.wrong);
      unattemptPoints.push(result.unattempt);
      labels.push(
        result.title +
          "\n(" +
          new Date(result.createdAt).toLocaleDateString() +
          ")"
      );
    });
    let accuracy = ((correct / (correct + wrong)) * 100).toFixed(2);
    setStat({ correct, questions, wrong, accuracy, unattempt });

    var ctx = document.getElementById("statChart");
    let data = {
      labels,
      datasets: [
        {
          data: correctPoints,
          backgroundColor: "green",
          label: "Correct",
          barPercentage: 0.5,
          maxBarThickness: 40,
        },
        {
          data: wrongPoints,
          backgroundColor: "red",
          label: "Wrong",
          barPercentage: 0.5,
          maxBarThickness: 40,
        },
        {
          data: unattemptPoints,
          backgroundColor: "yellow",
          label: "Unattempt",
          barPercentage: 0.5,
          maxBarThickness: 40,
        },
      ],
    };
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }, []);

  useEffect(() => {
    if (stat) {
      let context = document.getElementById("pieStat");
      let pie = new Chart(context, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [stat.correct, stat.wrong, stat.unattempt],
              backgroundColor: ["green", "red", "yellow"],
            },
          ],
          labels: ["Correct", "Wrong", "Unattempted"],
        },
      });
    }
  }, [stat]);
  return (
    <>
      {stat ? (
        <>
          <div className="card test-list">
            <div className="card-body row">
              <h4 className="card-title">Test Statistics</h4>
              <p className="card-text col-md-5">
                <br />
                Total no. of questions sloved: {stat.questions}
                <br />
                <br />
                Total Correct Answers: {stat.correct}
                <br />
                <br />
                Total Wrong Answers: {stat.wrong}
                <br />
                <br />
                Total Questions Unattempted: {stat.unattempt}
                <br />
                <br />
                Total Marks Scored: {stat.correct * 4 - stat.wrong}
                <br />
                <br />
                Accuracy: {stat.accuracy}%
              </p>
              <div className="col-md-4">
                <canvas
                  id="pieStat"
                  aria-label="chart"
                  role="img"
                  height="200"
                  width="200"
                ></canvas>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center loader">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      <canvas
        id="statChart"
        aria-label="chart"
        role="img"
        style={{ backgroundColor: "white" }}
        height="100"
        width="200"
        className="mt-5"
      ></canvas>
    </>
  );
}

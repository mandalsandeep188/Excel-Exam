import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { QuestionContext } from "../App";

export default function Test() {
  const [tests, setTests] = useState([]);
  const { dispatch } = useContext(QuestionContext);
  const history = useHistory();
  useEffect(() => {
    fetch("/fetchTests", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setTests(data))
      .catch((err) => console.log(err));
  }, []);

  const getTime = (startTime) => {
    let schedule = new Date(startTime);
    let time = schedule.toLocaleTimeString();
    return time.replace(":00", "");
  };
  const getDate = (startTime) => {
    let schedule = new Date(startTime);
    let date = schedule.toLocaleDateString();
    return date;
  };

  const takeTest = (questions, startTime) => {
    dispatch({
      type: "TEST",
      payload: { selectedQuestions: questions, startTime },
    });
    history.push("/taketest");
  };

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          {tests.length > 0 ? (
            tests.map((test) => {
              return (
                <div className="col-md-4 my-4" key={test._id}>
                  <div className="card test-card">
                    <div className="card-header">Test</div>
                    <div className="card-body">
                      <h4 className="card-title">{test.title}</h4>
                      <p className="card-text text-center">
                        <i
                          className="fa fa-laptop text-info test-icon"
                          aria-hidden="true"
                        ></i>
                      </p>
                      <p className="card-text">
                        Start time :
                        <i
                          className="fa fa-clock-o text-info time-icon"
                          aria-hidden="true"
                        ></i>
                        {getTime(test.startTime)}
                        <i
                          className="fa fa-calendar text-info time-icon"
                          aria-hidden="true"
                        ></i>
                        {getDate(test.startTime)}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => takeTest(test.questions, test.startTime)}
                      >
                        Start
                      </button>
                      <button className="btn btn-primary ml-3" disabled={true}>
                        Result
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="d-flex justify-content-center loader"
              style={{ left: "0%" }}
            >
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

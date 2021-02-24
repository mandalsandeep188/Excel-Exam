import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { QuestionContext, UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Test() {
  const [tests, setTests] = useState([]);
  const { dispatch } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "SUBMIT" });
    fetch("/fetchTests", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

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

  const checkResult = (results) => {
    for (let i = 0; i < results.length; i++) {
      if (results[i].user === user._id) return true;
    }
    return false;
  };

  const seeResult = (questions, startTime, results) => {
    if (!user) {
      toast.error("Login in Continue");
      return;
    }
    let check = checkResult(results)
      ? new Date(startTime).getTime() + questions.length * 1000 * 120 <
        new Date().getTime()
      : false;

    if (check) {
      let resID;
      for (let i = 0; i < results.length; i++) {
        if (results[i].user === user._id) {
          resID = results[i]._id;
          break;
        }
      }
      fetch(`/seeResult/${resID}`)
        .then((res) => res.json())
        .then((result) => {
          dispatch({
            type: "TEST",
            payload: {
              ...result,
              selectedQuestions: result.questions,
              questions: true,
            },
          });
          history.push("/result");
        });
    } else {
      toast.error("Result not available!");
    }
  };

  const takeTest = (questions, startTime, _id, results, title) => {
    if (!user) {
      toast.error("Login to continue");
    } else {
      let check =
        new Date(startTime).getTime() + questions.length * 1000 * 120 <
        new Date().getTime()
          ? true
          : user
          ? checkResult(results)
          : false;
      if (!check) {
        dispatch({
          type: "TEST",
          payload: { selectedQuestions: questions, startTime, _id, title },
        });
        history.push("/taketest");
      } else {
        toast.error("Test not available!");
      }
    }
  };

  return (
    <>
      <div className="container my-2">
        <div className="row">
          {tests.length > 0 ? (
            tests.map((test) => {
              return (
                <div className="col-md-4 my-4" key={test._id}>
                  <div className="card test-card">
                    <div className="card-header text-light">{test.title}</div>
                    <div className="card-body">
                      <div className=" card-img">
                        <img
                          src="practice.png"
                          className="img-fluid"
                          alt="test"
                        />
                      </div>
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
                      <p className="card-text">
                        No. of questions: {test.questions.length}
                      </p>
                      <div className="row justify-content-between mx-2">
                        <button
                          className="col-5 btn btn-info"
                          onClick={() =>
                            takeTest(
                              test.questions,
                              test.startTime,
                              test._id,
                              test.results,
                              test.title
                            )
                          }
                        >
                          Start
                        </button>
                        <button
                          className="col-5 btn btn-info"
                          onClick={() =>
                            seeResult(
                              test.questions,
                              test.startTime,
                              test.results
                            )
                          }
                        >
                          Result
                        </button>
                      </div>
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

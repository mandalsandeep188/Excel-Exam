import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css";

export default function TestResults() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch("/getTests")
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
      });
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

  const deleteTest = (test, i) => {
    fetch("/deleteTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testID: test,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        let arr = [...tests];
        arr.splice(i, 1);
        setTests(arr);
        toast.error("Test Deleted");
      });
  };

  return (
    <div className="container">
      <h2>Tests</h2>
      {tests.length > 0 ? (
        tests.map((test, i) => {
          return (
            <div className="row mt-3" key={test._id}>
              <div className="col-md-4 ">
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
                    <div className="row justify-content-between mx-2">
                      <button
                        className="col-md-5 btn btn-danger"
                        onClick={() => deleteTest(test._id, i)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-5 mx-5 res mt-2">
                <h5>Results</h5>
                <ul className="list-group h-100 overflow-auto">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="font-weight-bold">Name</span>
                    <span className="font-weight-bold">Marks</span>
                  </li>
                  {test.results.map((res) => {
                    return (
                      <li
                        key={res._id}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>{res.user.name}</span>
                        <span>{res.correct * 4 - res.wrong}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })
      ) : tests.length === 0 ? (
        "No Tests Available"
      ) : (
        <div className="d-flex justify-content-center loader">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
    </div>
  );
}

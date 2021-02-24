import React, { useContext } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { QuestionContext } from "../App";
import { toast } from "react-toastify";

export default function TestsList(props) {
  const { dispatch } = useContext(QuestionContext);
  const history = useHistory();
  const seeResult = (result) => {
    let check = true;
    if (result.startTime) {
      check =
        new Date(result.startTime).getTime() +
          result.questions.length * 1000 * 120 <
        new Date().getTime();
    }
    if (check) {
      dispatch({
        type: "TEST",
        payload: {
          ...result,
          selectedQuestions: result.questions,
          questions: true,
        },
      });
      history.push("/result");
    } else toast.error("Test time not over yet!");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {props.results.length > 0 ? (
            <>
              {props.results.map((result) => {
                return (
                  <div className="col-sm-4" key={result._id}>
                    <div className="card test-list mb-5">
                      <div className="card-body">
                        <h5 className="card-title">
                          {result.title}
                          <i
                            className="fa fa-calendar text-info time-icon"
                            aria-hidden="true"
                          ></i>
                          {new Date(result.createdAt).toLocaleDateString()}
                        </h5>
                        <p className="card-text">
                          No. of questions: {result.questions.length}
                          <br />
                          Correct: {result.correct}
                          <br />
                          Wrong: {result.wrong}
                          <br />
                          Marks: {result.correct * 4 - result.wrong}
                          <br />
                          Accuracy:{" "}
                          {(
                            (result.correct / (result.correct + result.wrong)) *
                            100
                          ).toFixed(2)}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => seeResult(result)}
                        >
                          See Result
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            "Now tests here. Go to Practice or Test to take test."
          )}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { QuestionContext, UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Sidebar from "react-sidebar";

export default function Taketest() {
  const { state, dispatch } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const [displayQuestion, setDisplayQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [physics, setPhysics] = useState([]);
  const [chemistry, setChemistry] = useState([]);
  const [maths, setMaths] = useState([]);
  const [questionNo, setQuestionNo] = useState(1);
  const [time, setTime] = useState("00 : 00 : 00");
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState([0]);
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  useEffect(() => {
    if (state) {
      let chem = [];
      let phy = [];
      let math = [];
      state.selectedQuestions.forEach((question) => {
        if (question.subject === "Physics") phy.push(question);
        if (question.subject === "Mathematics") math.push(question);
        if (question.subject === "Chemistry") chem.push(question);
      });
      setChemistry(chem);
      setPhysics(phy);
      setMaths(math);
      let arr = [...phy, ...chem, ...math];
      setQuestions(arr);
      setDisplayQuestion(arr[0]);
      let perQuestionTime = 2;
      setTimer(arr.length * perQuestionTime);

      let displayMessage = true;
      setTimeout(function () {
        displayMessage = false;
      }, perQuestionTime * arr.length * 60000);

      function confirmExit() {
        if (displayMessage && window.location.pathname === "/taketest") {
          return "Are you sure you want to leave?";
        }
      }
      window.onbeforeunload = confirmExit;
    }
  }, [state]);

  useEffect(() => {
    if (questions.length > 0) {
      let arr = [...Array(questions.length).fill(0)];
      arr[0] = 1;
      setStatus(arr);
    }
  }, [questions]);

  let x;

  const confirmSubmit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to submit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            submitTest();
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const confirmCancel = () => {
    confirmAlert({
      title: "Confirm to cancel",
      message: "Are you sure you want to cancel?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            toast.error("Test cancelled");
            history.push("/");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const submitTest = () => {
    if (state._id) {
      let correct = 0;
      let wrong = 0;
      let unattempt = 0;
      let ans = [];

      state.selectedQuestions.forEach((question, i) => {
        if (answers) {
          if (answers[`${i}`] && question.correct === answers[`${i}`]) {
            correct++;
            ans.push(answers[`${i}`]);
          } else if (answers[`${i}`]) {
            wrong++;
            ans.push(answers[`${i}`]);
          } else {
            unattempt++;
            ans.push(null);
          }
        }
      });

      fetch("/saveResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: state.title,
          testID: state._id,
          correct,
          wrong,
          unattempt,
          user: user._id,
          userModel: user.from ? "SocialUser" : "User",
          startTime: state.startTime,
          questions,
          answers,
        }),
      });
      toast.info("Test Submitted");
      history.replace("/");
    } else {
      if (state.createdAt) {
        dispatch({
          type: "TEST",
          payload: { ...state, answers },
        });
      } else {
        dispatch({
          type: "TEST",
          payload: {
            ...state,
            answers,
            title: "Practice",
            createdAt: new Date().toISOString(),
          },
        });
      }
      toast.info("Test Submitted");
      history.replace("/result");
    }
  };

  const setTimer = (countDownTime) => {
    countDownTime *= 1000 * 60;
    countDownTime += new Date().getTime();

    if (state.startTime) {
      countDownTime -=
        new Date().getTime() - new Date(state.startTime).getTime();
    }

    const zeroPad = (num, places) => String(num).padStart(places, "0");

    x = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownTime - now;
      let hours = Math.floor(distance / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let timer =
        zeroPad(hours, 2) +
        " : " +
        zeroPad(minutes, 2) +
        " : " +
        zeroPad(seconds, 2);
      setTime(timer);

      // If the count down is finished
      if (distance < 0) {
        clearInterval(x);
        setTime("00: 00 : 00");
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(x);
    };
  }, []);
  const changeStatus = (n, s) => {
    let arr = [...status];
    arr[n] = s;
    setStatus(arr);
  };

  const selectedQuestion = (i) => {
    setDisplayQuestion(questions[i]);
    setQuestionNo(i + 1);
    if (status[i] === 0) changeStatus(i, 1);
  };

  const selectAnswer = (answer) => {
    let ans = { ...answers };
    ans[`${questionNo - 1}`] = answer;
    setAnswers(ans);
    changeStatus(questionNo - 1, 2);
  };

  const getStatus = (n) => {
    let i = status[n];
    if (i === 2) return "success";
    else if (i === 3) return "danger";
    else if (n + 1 === questionNo) return "info";
    else if (i === 1) return "warning";
    else if (i === 0) return "primary";
  };

  const markForReview = () => {
    if (status[questionNo - 1] === 3) changeStatus(questionNo - 1, 1);
    else changeStatus(questionNo - 1, 3);
  };

  const clearAnswer = () => {
    if (status[questionNo - 1] === 2) {
      let ans = { ...answers };
      ans[`${questionNo - 1}`] = undefined;
      setAnswers(ans);
      changeStatus(questionNo - 1, 1);
    }
  };

  useEffect(() => {
    if (time === "00: 00 : 00") submitTest();
  }, [time]);

  return (
    <>
      <nav className="navbar-expand-lg navbar-light pb-5">
        <Sidebar
          sidebar={
            <>
              <div className="container-fluid my-3">
                <div className="row">
                  <div className="col-md-3 question-opt-div">
                    <div className="row ques-no">
                      <div className="q-no">Questions </div>
                      <div className="status bg-primary">Not Visited</div>
                      <div className="status bg-info">Current</div>
                      <div className="status bg-warning text-dark">Visited</div>
                      <div className="status bg-success">Answered</div>
                      <div className="status bg-danger">Marked</div>
                      <div className="accordion" id="accordionSubject">
                        {physics.length > 0 ? (
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="headingPhysics"
                            >
                              <div
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapsePhysics"
                                aria-expanded="false"
                                aria-controls="collapsePhysics"
                              >
                                <div className="q-sub">Physics</div>
                              </div>
                            </div>
                            <div
                              id="collapsePhysics"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingPhysics"
                              data-bs-parent="#accordionSubject"
                            >
                              <div className="accordion-body row gx-3">
                                {[...Array(physics.length)].map((e, i) => {
                                  return (
                                    <div className="col-2" key={i}>
                                      <button
                                        type="button"
                                        className={`btn btn-${getStatus(
                                          i
                                        )} ques-opt`}
                                        onClick={() => selectedQuestion(i)}
                                      >
                                        {i + 1}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : undefined}
                        {chemistry.length > 0 ? (
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="headingChemistry"
                            >
                              <div
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseChemistry"
                                aria-expanded="false"
                                aria-controls="collapseChemistry"
                              >
                                <div className="q-sub">Chemistry</div>
                              </div>
                            </div>
                            <div
                              id="collapseChemistry"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingChemistry"
                              data-bs-parent="#accordionSubject"
                            >
                              <div className="accordion-body row gx-3">
                                {[...Array(chemistry.length)].map((e, i) => {
                                  return (
                                    <div className="col-2" key={i}>
                                      <button
                                        type="button"
                                        className={`btn btn-${getStatus(
                                          i + physics.length
                                        )} ques-opt`}
                                        onClick={() =>
                                          selectedQuestion(i + physics.length)
                                        }
                                      >
                                        {i + physics.length + 1}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : undefined}
                        {maths.length > 0 ? (
                          <div className="accordion-item">
                            <div className="accordion-header" id="headingMaths">
                              <div
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseMaths"
                                aria-expanded="false"
                                aria-controls="collapseMaths"
                              >
                                <div className="q-sub">Mathematics </div>
                              </div>
                            </div>
                            <div
                              id="collapseMaths"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingMaths"
                              data-bs-parent="#accordionSubject"
                            >
                              <div className="accordion-body row gx-3">
                                {[...Array(maths.length)].map((e, i) => {
                                  return (
                                    <div className="col-2" key={i}>
                                      <button
                                        type="button"
                                        className={`btn btn-${getStatus(
                                          i + physics.length + chemistry.length
                                        )} ques-opt`}
                                        onClick={() =>
                                          selectedQuestion(
                                            i +
                                              physics.length +
                                              chemistry.length
                                          )
                                        }
                                      >
                                        {i +
                                          physics.length +
                                          chemistry.length +
                                          1}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : undefined}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          open={sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          sidebarClassName={"sidebar"}
          rootClassName={"sidebar-root"}
          contentClassName={"content"}
        >
          <button className="ham-button" onClick={() => onSetSidebarOpen(true)}>
            <i className="fa fa-bars"></i>
          </button>
        </Sidebar>
      </nav>

      <div className="d-flex justify-content-end align-content-center mx-5">
        <h5 className="mx-3 mt-2 text-danger">{time}</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            confirmCancel();
          }}
        >
          Cancel
        </button>
      </div>

      <div className="container-fluid mt-3" style={{ marginBottom: "-10rem" }}>
        <div className="row">
          <div className="col-md-3 question-opt-div question-opt-div-lg">
            <div className="row ques-no">
              <div className="q-no">Questions </div>
              <div className="status bg-primary">Not Visited</div>
              <div className="status bg-info">Current</div>
              <div className="status bg-warning text-dark">Visited</div>
              <div className="status bg-success">Answered</div>
              <div className="status bg-danger">Marked</div>
              <div
                className="accordion"
                id="accordionSubject"
                style={{ padding: "12px" }}
              >
                {physics.length > 0 ? (
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingPhysics">
                      <div
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePhysics"
                        aria-expanded="false"
                        aria-controls="collapsePhysics"
                      >
                        <div className="q-sub">Physics</div>
                      </div>
                    </div>
                    <div
                      id="collapsePhysics"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingPhysics"
                      data-bs-parent="#accordionSubject"
                    >
                      <div className="accordion-body row gx-3">
                        {[...Array(physics.length)].map((e, i) => {
                          return (
                            <div className="col-md-2" key={i}>
                              <button
                                type="button"
                                className={`btn btn-${getStatus(i)} ques-opt`}
                                onClick={() => selectedQuestion(i)}
                              >
                                {i + 1}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : undefined}
                {chemistry.length > 0 ? (
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingChemistry">
                      <div
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseChemistry"
                        aria-expanded="false"
                        aria-controls="collapseChemistry"
                      >
                        <div className="q-sub">Chemistry</div>
                      </div>
                    </div>
                    <div
                      id="collapseChemistry"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingChemistry"
                      data-bs-parent="#accordionSubject"
                    >
                      <div className="accordion-body row gx-3">
                        {[...Array(chemistry.length)].map((e, i) => {
                          return (
                            <div className="col-md-2" key={i}>
                              <button
                                type="button"
                                className={`btn btn-${getStatus(
                                  i + physics.length
                                )} ques-opt`}
                                onClick={() =>
                                  selectedQuestion(i + physics.length)
                                }
                              >
                                {i + physics.length + 1}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : undefined}
                {maths.length > 0 ? (
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingMaths">
                      <div
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseMaths"
                        aria-expanded="false"
                        aria-controls="collapseMaths"
                      >
                        <div className="q-sub">Mathematics </div>
                      </div>
                    </div>
                    <div
                      id="collapseMaths"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingMaths"
                      data-bs-parent="#accordionSubject"
                    >
                      <div className="accordion-body row gx-3">
                        {[...Array(maths.length)].map((e, i) => {
                          return (
                            <div className="col-md-2" key={i}>
                              <button
                                type="button"
                                className={`btn btn-${getStatus(
                                  i + physics.length + chemistry.length
                                )} ques-opt`}
                                onClick={() =>
                                  selectedQuestion(
                                    i + physics.length + chemistry.length
                                  )
                                }
                              >
                                {i + physics.length + chemistry.length + 1}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </div>
          </div>
          <div className="col-md-8 question">
            <div className="q-no">Question No.{questionNo}) </div>
            {displayQuestion ? (
              <>
                {displayQuestion.question.search("https://") !== -1 ? (
                  <>
                    <img
                      className="ques-img img-fluid"
                      src={displayQuestion.question}
                      alt="question"
                    />
                    {displayQuestion.optionA ? (
                      <div className="row options">
                        <div className="col-5">
                          <span>A) </span> {displayQuestion.optionA}
                        </div>
                        <div className="col-5">
                          <span>B) </span> {displayQuestion.optionB}
                        </div>
                        <div className="col-5">
                          <span>C) </span> {displayQuestion.optionC}
                        </div>
                        <div className="col-5">
                          <span>D) </span> {displayQuestion.optionD}
                        </div>
                      </div>
                    ) : undefined}
                  </>
                ) : (
                  <>
                    <p className="ques-p">{displayQuestion.question}</p>
                    <div className="row options">
                      <div className="col-5">
                        <span>A) </span> {displayQuestion.optionA}
                      </div>
                      <div className="col-5">
                        <span>B) </span> {displayQuestion.optionB}
                      </div>
                      <div className="col-5">
                        <span>C) </span> {displayQuestion.optionC}
                      </div>
                      <div className="col-5">
                        <span>D) </span> {displayQuestion.optionD}
                      </div>
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-end align-items-center mt-2 mr-4">
                  <div className="form-check mr-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mark"
                      onChange={() => {
                        markForReview();
                      }}
                      checked={status[questionNo - 1] === 3}
                    />
                    <label className="form-check-label" htmlFor="mark">
                      Mark for Review
                    </label>
                  </div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={clearAnswer}
                  >
                    Clear Answer
                  </button>
                </div>
                <div className="row select-options">
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="optionA"
                      autoComplete="off"
                      value="Option A"
                      onChange={(e) => selectAnswer(e.target.value)}
                      checked={
                        answers[`${questionNo - 1}`] &&
                        answers[`${questionNo - 1}`] === "Option A"
                          ? true
                          : false
                      }
                    />
                    <label
                      className="btn btn-outline-primary check-opt"
                      htmlFor="optionA"
                    >
                      Option A
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="optionB"
                      autoComplete="off"
                      value="Option B"
                      onChange={(e) => selectAnswer(e.target.value)}
                      checked={
                        answers[`${questionNo - 1}`] &&
                        answers[`${questionNo - 1}`] === "Option B"
                          ? true
                          : false
                      }
                    />
                    <label
                      className="btn btn-outline-primary check-opt"
                      htmlFor="optionB"
                    >
                      Option B
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="optionC"
                      autoComplete="off"
                      value="Option C"
                      onChange={(e) => selectAnswer(e.target.value)}
                      checked={
                        answers[`${questionNo - 1}`] &&
                        answers[`${questionNo - 1}`] === "Option C"
                          ? true
                          : false
                      }
                    />
                    <label
                      className="btn btn-outline-primary check-opt"
                      htmlFor="optionC"
                    >
                      Option C
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="optionD"
                      autoComplete="off"
                      value="Option D"
                      onChange={(e) => selectAnswer(e.target.value)}
                      checked={
                        answers[`${questionNo - 1}`] &&
                        answers[`${questionNo - 1}`] === "Option D"
                          ? true
                          : false
                      }
                    />
                    <label
                      className="btn btn-outline-primary check-opt"
                      htmlFor="optionD"
                    >
                      Option D
                    </label>
                  </div>
                </div>
                <div className="col-md-12 justify-content-between d-flex">
                  {questionNo > 1 ? (
                    <button
                      type="button"
                      className="btn btn-info prev"
                      onClick={() => {
                        if (questionNo - 2 >= 0) {
                          selectedQuestion(questionNo - 2);
                        }
                      }}
                    >
                      Previous
                    </button>
                  ) : undefined}
                  {questionNo < questions.length ? (
                    <button
                      type="button"
                      className="btn btn-info next"
                      onClick={() => {
                        if (questionNo < questions.length) {
                          selectedQuestion(questionNo);
                        }
                      }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success next"
                      onClick={() => confirmSubmit()}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </>
            ) : undefined}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { Link, Prompt, useHistory } from "react-router-dom";
import { QuestionContext } from "../App";

export default function Taketest() {
  const { state, dispatch } = useContext(QuestionContext);
  const [displayQuestion, setDisplayQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [physics, setPhysics] = useState([]);
  const [chemistry, setChemistry] = useState([]);
  const [maths, setMaths] = useState([]);
  const [questionNo, setQuestionNo] = useState(1);
  const [time, setTime] = useState("00 : 00 : 00");
  const [answers, setAnswers] = useState({});
  const history = useHistory();

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

      window.addEventListener("beforeunload", function (e) {
        let confirmationMessage = "Are you sure you want to cancel test?";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome
      });
    }
  }, []);

  const setTimer = (countDownTime) => {
    countDownTime *= 1000 * 60;
    countDownTime += new Date().getTime();

    const zeroPad = (num, places) => String(num).padStart(places, "0");

    let x = setInterval(() => {
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
        alert("Time Ended!");
        setTime("00 : 00 : 00");
      }
    }, 1000);
  };

  const selectedQuestion = (i) => {
    setDisplayQuestion(questions[i]);
    setQuestionNo(i + 1);
  };

  const selectAnswer = (answer) => {
    let ans = { ...answers };
    ans[`${questionNo - 1}`] = answer;
    setAnswers(ans);
  };

  const submitTest = () => {
    console.log(answers);
    dispatch({ type: "TEST", payload: { ...state, answers } });
    history.push("/result");
  };

  return (
    <>
      <Prompt
        when={true}
        message="Are you sure you want to cancel test?"
        // onConfirm={dispatch({ type: "TEST", payload: null })}
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="EE.png" />
            <span className="brand">Excel Exam</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item timer">
                <h5 className="mx-3 mt-2">{time}</h5>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Cancel
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3 question-opt-div">
            <div className="row ques-no">
              <div className="q-no">Questions </div>
              {physics.length > 0 ? (
                <>
                  <div className="q-sub">Physics </div>
                  {[...Array(physics.length)].map((e, i) => {
                    return (
                      <div className="col-md-3" key={i}>
                        <button
                          type="button"
                          className="btn btn-primary ques-opt"
                          onClick={() => selectedQuestion(i)}
                        >
                          {i + 1}
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : undefined}
              {chemistry.length > 0 ? (
                <>
                  <div className="q-sub">Chemistry </div>
                  {[...Array(chemistry.length)].map((e, i) => {
                    return (
                      <div className="col-md-3" key={i}>
                        <button
                          type="button"
                          className="btn btn-primary ques-opt"
                          onClick={() => selectedQuestion(i + physics.length)}
                        >
                          {i + physics.length + 1}
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : undefined}
              {maths.length > 0 ? (
                <>
                  <div className="q-sub">Mathematics </div>
                  {[...Array(maths.length)].map((e, i) => {
                    return (
                      <div className="col-md-3" key={i}>
                        <button
                          type="button"
                          className="btn btn-primary ques-opt"
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
                </>
              ) : undefined}
            </div>
          </div>
          <div className="col-md-8 question">
            <div className="q-no">Question No.{questionNo}) </div>
            {displayQuestion ? (
              <>
                {displayQuestion.question.search("https://") !== -1 ? (
                  <img
                    className="ques-img img-fluid"
                    src={displayQuestion.question}
                  />
                ) : (
                  <>
                    <p className="ques-p">{displayQuestion.question}</p>
                    <div className="row options">
                      <div className="col-md-5">
                        <span>A) </span> {displayQuestion.optionA}
                      </div>
                      <div className="col-md-5">
                        <span>B) </span> {displayQuestion.optionB}
                      </div>
                      <div className="col-md-5">
                        <span>C) </span> {displayQuestion.optionC}
                      </div>
                      <div className="col-md-5">
                        <span>D) </span> {displayQuestion.optionD}
                      </div>
                    </div>
                  </>
                )}

                <div className="row select-options">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                      onClick={() => submitTest()}
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

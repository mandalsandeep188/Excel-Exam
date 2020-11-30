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
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      let confirmationMessage = "Are you sure you want to leave?";
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Webkit, Safari, Chrome
    });
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
    }
  }, []);

  const selectedQuestion = (i) => {
    setDisplayQuestion(questions[i]);
    setQuestionNo(i + 1);
  };

  return (
    <>
      <Prompt
        when={true}
        message="Are you sure you want to leave? Test will get cancelled!!"
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
              <li className="nav-item">
                <button type="button" className="btn btn-primary">
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
                </div>
              </>
            ) : undefined}
          </div>
        </div>
      </div>
    </>
  );
}

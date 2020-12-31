import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import chapters from "../constants/chapters";
import { QuestionContext } from "../App";

var questionsFetched = [];

export default function MakeTest() {
  const { dispatch } = useContext(QuestionContext);
  const [subject, setSubject] = useState([]);
  const [standard, setStandard] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);
  const history = useHistory();

  const addClass = (e) => {
    if (!standard.includes(e.target.value)) {
      setStandard([...standard, e.target.value]);
    } else {
      setStandard(standard.filter((a) => a !== e.target.value));
    }
  };

  const addSubject = (e) => {
    if (!subject.includes(e.target.value)) {
      setSubject([...subject, e.target.value]);
    } else {
      setSubject(subject.filter((a) => a !== e.target.value));
    }
  };

  const selectQuestion = (e) => {
    if (!selectedQuestions.includes(e.target.value)) {
      setSelectedQuestions([...selectedQuestions, e.target.value]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((a) => a !== e.target.value)
      );
    }
  };

  const selectChapter = (e) => {
    if (!selectedChapter.includes(e.target.value)) {
      setSelectedChapter([...selectedChapter, e.target.value]);
    } else {
      setSelectedChapter(selectedChapter.filter((a) => a !== e.target.value));
    }
  };

  useEffect(() => {
    if (subject && standard) {
      let array = [];
      if (standard.includes("11th")) {
        subject.forEach((element) => {
          if (element === "Chemistry") {
            array = chapters.Chemistry.eleventh;
          }
          if (element === "Physics") {
            array = [...array, ...chapters.Physics.eleventh];
          }
          if (element === "Mathematics") {
            array = [...array, ...chapters.Mathematics.eleventh];
          }
        });
      }
      if (standard.includes("12th")) {
        subject.forEach((element) => {
          if (element === "Chemistry") {
            array = [...array, ...chapters.Chemistry.twelveth];
          }
          if (element === "Physics") {
            array = [...array, ...chapters.Physics.twelveth];
          }
          if (element === "Mathematics") {
            array = [...array, ...chapters.Mathematics.twelveth];
          }
        });
      }
      setChapter(array);
    }
  }, [subject, standard]);

  useEffect(() => {
    fetch("/fetchQuestions")
      .then((result) => result.json())
      .then((data) => {
        setQuestions(data);
        questionsFetched = data;
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedChapter.length === 0) {
      setQuestions(questionsFetched);
    } else {
      let array = questionsFetched.filter((ques) => {
        if (selectedChapter.includes(ques.chapter)) {
          return ques;
        }
      });
      setQuestions(array);
    }
  }, [selectedChapter]);

  const makeTest = () => {
    let quesList = [];
    questionsFetched.forEach((question) => {
      if (selectedQuestions.includes(question._id)) {
        quesList.push(question);
      }
    });
    dispatch({
      type: "TEST",
      payload: {
        selectedQuestions: quesList,
      },
    });
    history.push("/taketest");
  };

  return (
    <>
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-3 filter">
            <p className="mt-1">
              No. of Questions selected: {selectedQuestions.length}
            </p>
            {selectedQuestions.length > 0 ? (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => makeTest()}
              >
                Create Test
              </button>
            ) : undefined}
            <hr />
            <h5 className="mt-1">Class</h5>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="11th"
                onChange={(e) => {
                  addClass(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                11th
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox2"
                value="12th"
                onChange={(e) => {
                  addClass(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                12th
              </label>
            </div>
            <hr />
            <h5 className="mt-3">Subject</h5>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="Physics"
                onChange={(e) => {
                  addSubject(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                Physics
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="Chemistry"
                onChange={(e) => {
                  addSubject(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                Chemistry
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="Mathematics"
                onChange={(e) => {
                  addSubject(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                Mathematics
              </label>
            </div>
            <hr />
            <h5 className="mt-3">Chapter</h5>
            {chapter.length > 0 ? (
              chapter.map((chap, index) => {
                return (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={chap}
                      value={chap}
                      onChange={(e) => {
                        selectChapter(e);
                      }}
                      checked={selectedChapter.includes(chap)}
                    />
                    <label className="form-check-label" htmlFor={chap}>
                      {chap}
                    </label>
                  </div>
                );
              })
            ) : (
              <p>Select class and subjects to select chapters</p>
            )}
          </div>
          <div className="col-9 questions-list">
            {questions.length > 0 ? (
              questions.map((ques) => {
                return (
                  <div key={ques._id}>
                    <div className="form-check form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={ques._id}
                        value={ques._id}
                        onChange={(e) => {
                          selectQuestion(e);
                        }}
                        checked={selectedQuestions.includes(ques._id)}
                      />
                      <label className="form-check-label" htmlFor={ques._id}>
                        {ques.question.search("https://") !== -1 ? (
                          <img
                            className="ques-show-img img-fluid"
                            src={ques.question}
                          />
                        ) : (
                          <p className="ques-show-p">{ques.question}</p>
                        )}
                      </label>
                    </div>
                  </div>
                );
              })
            ) : (
              <div class="d-flex justify-content-center">
                <div class="spinner-grow text-primary" role="status">
                  {/* <span class="visually-hidden">Loading...</span> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

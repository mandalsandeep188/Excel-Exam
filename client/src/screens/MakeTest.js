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
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
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
    if (standard.length !== 0 && subject.length !== 0) {
      if (selectedChapter.length === 0) {
        let array = questionsFetched.filter((ques) => {
          if (
            subject.includes(ques.subject) &&
            standard.includes(ques.standard)
          ) {
            return ques;
          }
        });
        setQuestions(array);
      }
    } else {
      setQuestions(questionsFetched);
    }

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

  useEffect(() => {
    if (subject.length === 0 && standard.length !== 0) {
      if (selectedChapter.length === 0) {
        let array = questionsFetched.filter((ques) => {
          if (standard.includes(ques.standard)) {
            return ques;
          }
        });
        setQuestions(array);
      }
    } else if (standard.length === 0 && subject.length === 0) {
      setQuestions(questionsFetched);
    }
  }, [standard]);

  useEffect(() => {
    if (standard.length === 0 && subject.length !== 0) {
      if (selectedChapter.length === 0) {
        let array = questionsFetched.filter((ques) => {
          if (subject.includes(ques.subject)) {
            return ques;
          }
        });
        setQuestions(array);
      }
    } else if (standard.length === 0 && subject.length === 0) {
      setQuestions(questionsFetched);
    }
  }, [subject]);

  const makeTest = () => {
    fetch("/maketest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questions: selectedQuestions,
        title,
        startTime: date + " " + time,
      }),
    })
      .then(() => {
        alert("Test Created Successfully");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4 filter">
            <p className="mt-1">
              No. of Questions selected: {selectedQuestions.length}
            </p>
            {selectedQuestions.length > 0 ? (
              <form>
                <div className="mb-3">
                  <label htmlFor="testTitle" className="form-label">
                    Test Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="textTitle"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    makeTest();
                  }}
                >
                  Create Test
                </button>
              </form>
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
          <div className="col-md-8">
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
              <div className="d-flex justify-content-center loader">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

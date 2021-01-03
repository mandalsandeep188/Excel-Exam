import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import chapters from "../constants/chapters";
import { QuestionContext } from "../App";

export default function Practice() {
  const { dispatch } = useContext(QuestionContext);
  const [subject, setSubject] = useState([]);
  const [standard, setStandard] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const history = useHistory();

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

  const selectChapter = (e) => {
    if (!selectedChapter.includes(e.target.value)) {
      setSelectedChapter([...selectedChapter, e.target.value]);
    } else {
      setSelectedChapter(selectedChapter.filter((a) => a !== e.target.value));
    }
  };

  const practice = () => {
    console.log(standard, subject, selectedChapter);
    fetch("/practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        noOfQuestions,
        standard,
        subject,
        selectedChapter,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "TEST",
          payload: {
            selectedQuestions: data.questions,
          },
        });
        history.push("/taketest");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="filter">
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
            <hr />
            <div className="row g-3">
              <label htmlFor="number" className="col-sm-2 col-form-label">
                No. of questions
              </label>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  onChange={(e) => setNoOfQuestions(e.target.value)}
                />
              </div>

              <div className="col-md-7">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => practice()}
                >
                  Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

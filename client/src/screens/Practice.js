import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import chapters from "../constants/chapters";
import { QuestionContext, UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Practice() {
  const { dispatch } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const [subject, setSubject] = useState([]);
  const [standard, setStandard] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);
  const [noOfQuestions, setNoOfQuestions] = useState(null);
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "SUBMIT" });
  }, [dispatch]);

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
    if (!user) {
      toast.error("Login to continue");
    } else if (noOfQuestions && noOfQuestions > 0) {
      setLoader(true);
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
          dispatch({
            type: "TEST",
            payload: {
              selectedQuestions: data.questions,
            },
          });
          setLoader(false);
          history.push("/taketest");
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Invalid No. of Questions!");
    }
  };

  return (
    <>
      <div className="container practice-container">
        {loader ? (
          <div className="d-flex justify-content-center loader">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : undefined}
        <div className="row">
          <div className="col-md-5 filter m-auto">
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
              <label htmlFor="number" className="col-sm-4 col-form-label">
                No. of questions
              </label>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  onChange={(e) => setNoOfQuestions(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-7 mt-2">
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
    </>
  );
}

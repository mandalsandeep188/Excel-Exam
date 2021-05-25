import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import chapters from "../constants/chapters";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebase = require("firebase/app");
require("firebase/storage");
const storageRef = firebase.storage().ref();

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function AddQuestion() {
  const [addFormat, setAddFormat] = useState("Type");
  const [showOption, setShowOption] = useState(false);
  const [subject, setSubject] = useState(null);
  const [standard, setStandard] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correct, setCorrect] = useState(null);
  const [upImg, setUpImg] = useState(null);
  const [cropedImage, setCropedImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCropedImage(cropper.getCroppedCanvas().toDataURL());
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (standard && subject) {
      if (standard === "11th") {
        if (subject === "Physics") {
          setChapterOptions(chapters.Physics.eleventh);
        } else if (subject === "Chemistry") {
          setChapterOptions(chapters.Chemistry.eleventh);
        } else if (subject === "Mathematics") {
          setChapterOptions(chapters.Mathematics.eleventh);
        }
      } else if (standard === "12th") {
        if (subject === "Physics") {
          setChapterOptions(chapters.Physics.twelveth);
        } else if (subject === "Chemistry") {
          setChapterOptions(chapters.Chemistry.twelveth);
        } else if (subject === "Mathematics") {
          setChapterOptions(chapters.Mathematics.twelveth);
        }
      }
    }
  }, [standard, subject]);

  const addQuestionField = () => {
    if (standard && subject && chapter && correct) {
      setLoader(true);
      fetch("/addQuestion", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correct,
          standard,
          subject,
          chapter,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            toast.err(data.err);
            return;
          }
          toast.success("Question added successfully");
          setLoader(false);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Select all fiels!!");
    }
  };

  useEffect(() => {
    if (question.search("https://") !== -1) {
      addQuestionField();
    }
  }, [question]);

  const addQuestion = () => {
    if (
      cropedImage &&
      cropedImage !== "data:," &&
      standard &&
      chapter &&
      subject &&
      correct
    ) {
      const fileName = `${standard}/${subject}/${chapter}/${uuidv4()}`;
      storageRef
        .child(fileName)
        .putString(cropedImage, "data_url")
        .then((snapshot) => {
          storageRef
            .child(fileName)
            .getDownloadURL()
            .then(function (url) {
              setQuestion(url);
            })
            .catch((error) => {
              alert(error.code);
            });
        });
    } else {
      if (!cropedImage) addQuestionField();
      else {
        toast.error("Select all fields!!");
      }
    }
  };

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center loader">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : undefined}
      <div className="container add-form">
        <h1 className="mt-5 mb-4">Add a question</h1>
        <form
          className="row g-3 my-3"
          onSubmit={(e) => {
            e.preventDefault();
            addQuestion();
          }}
        >
          <div className="col-md-8">
            <label htmlFor="inputState" className="form-label">
              Subject
            </label>
            <select
              className="form-select"
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option defaultValue>Select Subject</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
            </select>
          </div>
          <div className="col-md-8">
            <label htmlFor="inputState" className="form-label">
              Class
            </label>
            <select
              className="form-select"
              onChange={(e) => setStandard(e.target.value)}
              required
            >
              <option defaultValue>Select Class</option>
              <option>11th</option>
              <option>12th</option>
            </select>
          </div>
          <div className="col-md-8">
            <label htmlFor="inputState" className="form-label">
              Chapter
            </label>
            <select
              className="form-select"
              onChange={(e) => setChapter(e.target.value)}
              required
            >
              <option defaultValue>Select Chapter</option>
              {chapterOptions.map((opt) => {
                return <option key={opt}>{opt}</option>;
              })}
            </select>
          </div>
          <div className="btn-group col-md-6">
            <input
              type="radio"
              className="btn-check"
              name="addFormat"
              id="option1"
              autoComplete="off"
              value="Type"
              onClick={(e) => {
                setAddFormat(e.target.value);
              }}
              defaultChecked
            />
            <label className="btn btn-outline-primary choose" htmlFor="option1">
              Type question
            </label>
            <input
              type="radio"
              className="btn-check"
              name="addFormat"
              id="option2"
              autoComplete="off"
              value="Upload"
              onClick={(e) => {
                setAddFormat(e.target.value);
              }}
            />
            <label className="btn btn-outline-primary choose" htmlFor="option2">
              Upload question image
            </label>
          </div>
          {addFormat === "Type" ? (
            <>
              <div className="mb-3 col-md-12">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Type your question here
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option A"
                  aria-label="Option A"
                  onChange={(e) => setOptionA(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option B"
                  aria-label="Option B"
                  onChange={(e) => setOptionB(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option C"
                  aria-label="Option C"
                  onChange={(e) => setOptionC(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option D"
                  aria-label="Option D"
                  onChange={(e) => setOptionD(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-file col-md-8">
                <input
                  type="file"
                  className="form-file-input"
                  id="customFile"
                  accept="image/*"
                  onChange={onSelectFile}
                  required
                />
                <label className="form-file-label upload" htmlFor="customFile">
                  <span className="form-file-text">
                    Choose question image...
                  </span>
                  <span className="form-file-button">Browse</span>
                </label>
              </div>
              {upImg ? (
                <div className="col-md-8">
                  <Cropper
                    src={upImg}
                    initialAspectRatio={16 / 9}
                    crop={onCrop}
                    ref={cropperRef}
                  />
                </div>
              ) : undefined}
              {cropedImage && cropedImage !== "data:," ? (
                <div className="col-md-8">
                  <img src={cropedImage} className="img-fluid croped" />
                </div>
              ) : undefined}

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={(e) => setShowOption(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Options are not in image
                </label>
              </div>
              {showOption ? (
                <>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option A"
                      aria-label="Option A"
                      onChange={(e) => setOptionA(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option B"
                      aria-label="Option B"
                      onChange={(e) => setOptionB(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option C"
                      aria-label="Option C"
                      onChange={(e) => setOptionC(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option D"
                      aria-label="Option D"
                      onChange={(e) => setOptionD(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : undefined}
            </>
          )}
          <div className="col-md-8">
            <label htmlFor="inputState" className="form-label">
              Correct Option
            </label>
            <select
              className="form-select"
              onChange={(e) => setCorrect(e.target.value)}
              required
            >
              <option defaultValue>Select correct option</option>
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add Question
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

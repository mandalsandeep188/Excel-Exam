import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { QuestionContext } from "../App";
import Taketest from "./TakeTest";
import Navbar from "../components/Navbar";

export default function TestOnTime() {
  const { state } = useContext(QuestionContext);
  const isItTime = () => {
    let startDate = new Date(state.startTime).getDate();
    let currentDate = new Date().getDate();
    let startTime = new Date(state.startTime).getTime();
    let currentTime = new Date().getTime();
    if (currentDate === startDate && currentTime >= startTime) return true;
    else {
      return false;
    }
  };
  const [showtest, setShowTest] = useState(isItTime());
  const [time, setTime] = useState(null);

  const setTimer = () => {
    let startTime = new Date(state.startTime).getTime();
    const countDownTime = startTime;

    const zeroPad = (num, places) => String(num).padStart(places, "0");

    let x = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownTime - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let timer =
        zeroPad(days, 2) +
        " d : " +
        zeroPad(hours, 2) +
        " h : " +
        zeroPad(minutes, 2) +
        " m : " +
        zeroPad(seconds, 2) +
        " s";
      setTime(timer);

      // If the count down is finished
      if (distance < 0) {
        clearInterval(x);
        setTime("00 d : 00 h : 00 m : 00 s");
        setShowTest(true);
      }
    }, 1000);
  };
  useEffect(() => {
    if (!showtest) {
      setTimer();
    }
  }, [showtest]);
  return (
    <>
      {showtest ? (
        <Taketest />
      ) : (
        <>
          <Navbar />
          <div className="container">
            {time ? (
              time
            ) : (
              <div className="d-flex justify-content-center loader">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

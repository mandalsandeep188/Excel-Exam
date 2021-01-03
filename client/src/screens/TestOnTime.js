import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { QuestionContext } from "../App";
import Taketest from "./TakeTest";
import Navbar from "../components/Navbar";

export default function TestOnTime() {
  const { state } = useContext(QuestionContext);
  const history = useHistory();
  useEffect(() => {
    if (state) history.go(0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">Test on time</div>
    </>
  );
}

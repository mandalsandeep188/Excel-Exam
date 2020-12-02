import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Login from "../screens/Login";
import Register from "../screens/Register";

export default function Navbar() {
  const [buttonTarget, setbuttonTarget] = useState("");
  return (
    <>
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
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/test" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/test"
                >
                  Tests
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/practice" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/test"
                >
                  Practice
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/addquestion" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/addquestion"
                >
                  Add Question
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/maketest" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/maketest"
                >
                  Make Test
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/test"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/profile" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/test"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#login"
                  onClick={() => setbuttonTarget("login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-toggle="modal"
                  data-target="#login"
                  onClick={() => setbuttonTarget("register")}
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div
        className="modal fade"
        id="login"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="login"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className=" navbar-brand">
                <img src="EE.png" />
                <span className="brand">Excel Exam</span>
              </div>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {buttonTarget === "login" ? <Login /> : <Register />}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-link"
                data-toggle="modal"
                data-target="#login"
                onClick={() =>
                  setbuttonTarget(
                    `${buttonTarget === "login" ? "register" : "login"}`
                  )
                }
              >
                {buttonTarget === "login" ? (
                  <>Create a new account</>
                ) : (
                  <>Already have an account</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

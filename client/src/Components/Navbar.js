import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
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
                  className="nav-link active"
                  aria-current="page"
                  to="/test"
                >
                  Tests
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/test">
                  Practice
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/addquestion"
                >
                  Add Question
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/maketest">
                  Make Test
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/test">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/test">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-primary">
                  Login
                </button>
                <button type="button" className="btn btn-outline-primary">
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

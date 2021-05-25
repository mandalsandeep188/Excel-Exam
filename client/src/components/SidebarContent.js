import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { UserContext } from "../App";
import { GoogleLogout } from "react-google-login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SidebarContent(props) {
  const { user, changeUser } = useContext(UserContext);
  return (
    <>
      <div className="sidebar-content">
        <Link to="/">
          <img src="Logo.png" className="img-fluid mt-3" alt="logo" />
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                window.location.pathname === "/test" ? "active" : ""
              }`}
              aria-current="page"
              to="/test"
            >
              <span>Tests</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                window.location.pathname === "/practice" ? "active" : ""
              }`}
              aria-current="page"
              to="/practice"
            >
              <span>Practice</span>
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
          {user ? (
            <>
              {user.type !== "Student" ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        window.location.pathname === "/maketest" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/maketest"
                    >
                      <span>Make Test</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        window.location.pathname === "/testresults"
                          ? "active"
                          : ""
                      }`}
                      aria-current="page"
                      to="/testresults"
                    >
                      <span>Test Results</span>
                    </Link>
                  </li>
                </>
              ) : undefined}
              {user.type === "Root" ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      window.location.pathname === "/root" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/root"
                  >
                    <span>Root Control</span>
                  </Link>
                </li>
              ) : undefined}
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    window.location.pathname === "/profile" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/profile"
                >
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item mt-3">
                {user.from ? (
                  user.from === "Google" ? (
                    <GoogleLogout
                      clientId="983080919072-n4hu753n78cgv7itkbiomp2g5n3cc51i.apps.googleusercontent.com"
                      buttonText="Logout"
                      onLogoutSuccess={() => {
                        changeUser({ type: "LOGOUT" });
                        localStorage.clear();
                        toast.error("Logged Out");
                      }}
                    ></GoogleLogout>
                  ) : (
                    <button
                      className="facebook-button"
                      style={{ width: "100%", marginTop: "0" }}
                      onClick={() => {
                        changeUser({ type: "LOGOUT" });
                        localStorage.clear();
                        toast.error("Logged Out");
                      }}
                    >
                      <i className="fa fa-facebook"></i> Logout
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      changeUser({ type: "LOGOUT" });
                      localStorage.clear();
                      toast.error("Logged Out");
                    }}
                  >
                    Logout
                  </button>
                )}
              </li>
            </>
          ) : undefined}

          {!user ? (
            <li className="nav-item mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.handleModal("login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => props.handleModal("register")}
              >
                Register
              </button>
            </li>
          ) : undefined}
        </ul>
      </div>
    </>
  );
}

import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { UserContext } from "../App";
import { GoogleLogout } from "react-google-login";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";

let myModal;

export default function Navbar() {
  const [buttonTarget, setbuttonTarget] = useState("");
  const { user, changeUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleModal = (target) => {
    myModal = new Modal(document.getElementById("login"), {});
    myModal.show();
    setbuttonTarget(target);
  };

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  const closeModal = () => {
    myModal.hide();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Sidebar
          sidebar={<SidebarContent handleModal={handleModal} />}
          open={sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          sidebarClassName={"sidebar"}
          rootClassName={"sidebar-root"}
          contentClassName={"content"}
        >
          <button className="ham-button" onClick={() => onSetSidebarOpen(true)}>
            <i className="fa fa-bars"></i>
          </button>
        </Sidebar>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="Logo.png" className="img-fluid" alt="logo" />
          </Link>
          <div className="stroke mt-3" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
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
                            window.location.pathname === "/maketest"
                              ? "active"
                              : ""
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
                  <li className="nav-item">
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
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleModal("login")}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleModal("register")}
                  >
                    Register
                  </button>
                </li>
              ) : undefined}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div
        className="modal fade"
        id="login"
        tabIndex="-1"
        aria-labelledby="login"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex justify-content-between w-100">
                <img src="Logo.png" className="img-fluid" alt="logo" />
                <button className="close-btn" onClick={closeModal}>
                  <i className="fa fa-close"></i>
                </button>
              </div>
            </div>
            <div className="modal-body">
              {buttonTarget === "login" ? (
                <Login modal={closeModal} />
              ) : (
                <Register modal={closeModal} />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-link"
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

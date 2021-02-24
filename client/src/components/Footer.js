import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Footer() {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="container-fluid footer">
      <footer className="row g-3">
        <div className="col-md-8">
          <Link to="/">Excel Exam </Link>© {getYear()} - All rights reserved
        </div>
        <div className="social-icons col-md-4">
          <Link
            className="fb"
            to="https://www.facebook.com/cleancodingsm/"
            target="blank"
            title="Join Us On Facebook"
          >
            <i className="fa fa-facebook"></i>
          </Link>
          <Link
            className="twt"
            to="https://twitter.com/CodingClean"
            target="blank"
            title="Follow Us On Twitter"
          >
            <i className="fa fa-twitter"></i>
          </Link>
          <Link
            className="insta"
            to="https://www.instagram.com/clean.coding/"
            target="blank"
            title="Follow Us On Instagram"
          >
            <i className="fa fa-instagram"></i>
          </Link>
          <Link
            className="git"
            to="https://www.github.com/mandalsandeep188/"
            target="blank"
            title="Follow Us On Github"
          >
            <i className="fa fa-github"></i>
          </Link>
          <Link
            className="in"
            to="https://www.linkedin.com/in/sandeep-mandal-3513601bb/"
            target="blank"
            title="Join Us On Linkedin"
          >
            <i className="fa fa-linkedin"></i>
          </Link>
        </div>
      </footer>
    </div>
  );
}

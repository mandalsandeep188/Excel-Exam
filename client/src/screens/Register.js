import React, { useState, useEffect } from "react";
import "../App.css";
import { GoogleLogin } from "react-google-login";

export default function Register() {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <>
      <GoogleLogin
        clientId="983080919072-n4hu753n78cgv7itkbiomp2g5n3cc51i.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className="google"
      />
      <h5 className="text-center">OR</h5>
      <hr />
      <h3 className="my-3 text-center">Register with Excel Exam</h3>
      <div className="container login-form">
        <form className="rows">
          <div className="mb-3 col-md-8">
            <img
              className="register-pic img-fluid"
              src="user.jpeg"
              alt="Profile pic"
            ></img>
          </div>
          <div className="mb-3 col-md-8">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3 col-md-8">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3 col-md-8">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
        </form>
      </div>
    </>
  );
}

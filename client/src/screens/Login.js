import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { Modal } from "bootstrap";
import Toast from "../components/Toast";

export default function Login() {
  const { user, changeUser } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [toast, setToast] = useState(null);
  const history = useHistory();

  const toggleModal = () => {
    // let myModal = new Modal(document.getElementById("login"), {});
    // console.log("modal", myModal);
    // myModal.hide();
  };

  const loginUser = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        changeUser({ type: "LOGIN", payload: data.user });
        setToast({ message: "Successfully logged in", type: "success" });
        toggleModal();
      })
      .catch((err) => console.log(err));
  };

  const responseGoogle = (response) => {
    try {
      let profileObj = response.profileObj;
      let googleUser = {
        id: profileObj.googleId,
        email: profileObj.email,
        name: profileObj.name,
        pic: profileObj.imageUrl,
        from: "Google",
      };
      localStorage.setItem("user", JSON.stringify(googleUser));
      changeUser({ type: "LOGIN", payload: googleUser });
      fetch("/socialLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profileObj.googleId,
          email: profileObj.email,
          name: profileObj.name,
          pic: profileObj.imageUrl,
          from: "Google",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          let gUser = { ...googleUser, _id: data._id };
          localStorage.setItem("user", JSON.stringify(gUser));
          changeUser({ type: "LOGIN", payload: gUser });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const responseFacebook = (response) => {
    try {
      let facebookUser = {
        id: response.userID,
        email: response.email,
        name: response.name,
        pic: response.picture.data.url,
        from: "Facebook",
      };
      fetch("/socialLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: response.userID,
          email: response.email,
          name: response.name,
          pic: response.picture.data.url,
          from: "Facebook",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          let fbUser = { ...facebookUser, _id: data._id };
          localStorage.setItem("user", JSON.stringify(fbUser));
          changeUser({ type: "LOGIN", payload: fbUser });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* {toast ? <Toast message={toast.message} type={toast.type} /> : undefined} */}
      <GoogleLogin
        clientId="983080919072-n4hu753n78cgv7itkbiomp2g5n3cc51i.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className="google"
      />
      <FacebookLogin
        appId="863319710877687"
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook-button"
        icon="fa-facebook"
      />
      ,<h5 className="text-center">OR</h5>
      <hr />
      <h3 className="my-3 text-center">Login to Excel Exam</h3>
      <div className="container login-form">
        <form className="rows">
          <div className="mb-3 col-md-8">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-8">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-8">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => loginUser()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

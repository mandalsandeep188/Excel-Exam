import React, { useState, useContext } from "react";
import "../App.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(props) {
  const { changeUser } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);

  const loginUser = () => {
    setLoader(true);
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
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          changeUser({ type: "LOGIN", payload: data.user });
          setLoader(false);
          props.modal();
          toast.success("Logged in Successfully");
        }
      });
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
          let gUser = { ...googleUser, _id: data._id, type: data.type };
          localStorage.setItem("user", JSON.stringify(gUser));
          changeUser({ type: "LOGIN", payload: gUser });
          props.modal();
          toast.success("Logged in Successfully");
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
          from: "Facebook",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let fbUser = { ...facebookUser, _id: data._id, type: data.type };
          localStorage.setItem("user", JSON.stringify(fbUser));
          changeUser({ type: "LOGIN", payload: fbUser });
          props.modal();
          toast.success("Logged in Successfully");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center loader">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : undefined}
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
        onFailure={responseFacebook}
        cssClass="facebook-button"
        size="metro"
        icon="fa-facebook"
      />
      ,<h5 className="text-center">OR</h5>
      <hr />
      <h3 className="my-3 text-center">Login to Excel Exam</h3>
      <div className="container login-form">
        <form
          className="rows"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <div className="mb-3 col-md-8">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>
          <div className="mb-3 col-md-8">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

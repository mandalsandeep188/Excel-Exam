import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebase = require("firebase/app");
require("firebase/storage");
const storageRef = firebase.storage().ref();

export default function Register(props) {
  const { changeUser } = useContext(UserContext);
  const [pic, setPic] = useState(null);
  const [imagePreview, setImagePreview] = useState("user.jpeg");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (pic) {
      let reader = new FileReader();
      reader.onload = async function () {
        await setImagePreview(reader.result);
      };
      reader.readAsDataURL(pic);
    }
  }, [pic]);

  const registerUser = () => {
    if (name && email && password) {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          pic: imageUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          changeUser({ type: "LOGIN", payload: data.user });
          props.modal();
          setLoader(false);
          toast.success("Registered Successfully");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const register = () => {
    setLoader(true);
    fetch("/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoader(false);
        } else {
          if (pic) {
            const fileName = `users/${email}`;
            storageRef
              .child(fileName)
              .put(pic)
              .then(() => {
                storageRef
                  .child(fileName)
                  .getDownloadURL()
                  .then((url) => {
                    setImageUrl(url);
                  })
                  .catch((error) => {
                    console.log(error.code);
                  });
              });
          } else {
            registerUser();
          }
        }
      });
  };

  useEffect(() => {
    if (imageUrl) registerUser();
  }, [imageUrl]);

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
          toast.success("Registered Successfully");
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
          let fbUser = { ...facebookUser, _id: data._id, type: data.type };
          localStorage.setItem("user", JSON.stringify(fbUser));
          changeUser({ type: "LOGIN", payload: fbUser });
          props.modal();
          toast.success("Registered Successfully");
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
        icon="fa-facebook"
      />
      <h5 className="text-center">OR</h5>
      <hr />
      <h3 className="my-3 text-center">Register with Excel Exam</h3>
      <div className="container login-form">
        <form
          className="rows"
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className="mb-3 col-md-8">
            <img
              className="register-pic img-fluid"
              src={imagePreview}
              alt="Profile pic"
            ></img>
          </div>
          <div className="upload-btn-wrapper mb-3 col-md-8">
            <button className="btn btn-primary">
              <i className="fa fa-camera icon" aria-hidden="true"></i>
              Profile Photo
            </button>
            <input
              type="file"
              name="myfile"
              accept="image/*"
              onChange={(e) => setPic(e.target.files[0])}
            />
          </div>
          <div className="mb-3 col-md-8">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

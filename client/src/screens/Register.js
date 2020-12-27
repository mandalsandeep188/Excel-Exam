import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { Modal } from "bootstrap";

const firebase = require("firebase");
const storageRef = firebase.storage().ref();

export default function Register() {
  const { user, changeUser } = useContext(UserContext);
  const [pic, setPic] = useState(null);
  const [imagePreview, setImagePreview] = useState("user.jpeg");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (pic) {
      let reader = new FileReader();
      reader.onload = async function () {
        await setImagePreview(reader.result);
      };
      reader.readAsDataURL(pic);
    }
  }, [pic]);

  const toggleModal = () => {
    // let myModal = new Modal(document.getElementById("login"), {
    //   keyboard: false,
    // });
    // console.log(myModal);
    // myModal.hide();
  };

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
          alert(data.message);
          toggleModal();
        })
        .catch((err) => alert(err.message));
    }
  };

  const register = () => {
    if (pic && email && name) {
      const fileName = `users/${email}`;
      storageRef
        .child(fileName)
        .put(pic)
        .then((snapshot) => {
          storageRef
            .child(fileName)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);
              console.log(url);
            })
            .catch((error) => {
              alert(error.code);
            });
        });
    } else {
      registerUser();
    }
  };

  useEffect(() => {
    if (imageUrl) registerUser();
  }, [imageUrl]);

  const responseGoogle = (response) => {
    let profileObj = response.profileObj;
    let googleUser = {
      _id: profileObj.googleId,
      email: profileObj.email,
      name: profileObj.name,
      pic: profileObj.imageUrl,
      from: "Google",
    };
    localStorage.setItem("user", JSON.stringify(googleUser));
    changeUser({ type: "LOGIN", payload: googleUser });
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
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                register();
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

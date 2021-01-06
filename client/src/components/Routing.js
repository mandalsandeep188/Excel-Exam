import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import "../App.css";
import Home from "../screens/Home";
import Test from "../screens/Test";
import AddQuestion from "../screens/AddQuestion";
import MakeTest from "../screens/MakeTest";
import Navbar from "./Navbar";
import Taketest from "../screens/TakeTest";
import Profile from "../screens/Profile";
import Result from "../screens/Result";
import TestOnTime from "../screens/TestOnTime";
import { UserContext, QuestionContext } from "../App";
import Practice from "../screens/Practice";
import Footer from "./Footer";

export default function Routing() {
  const history = useHistory();
  const { user, changeUser } = useContext(UserContext);
  const { state } = useContext(QuestionContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      changeUser({ type: "LOGIN", payload: user });
    }
  }, []);
  return (
    <Switch>
      <Route path="/test">
        <Navbar />
        <Test />
        <Footer />
      </Route>
      <Route path="/addquestion">
        <Navbar />
        <AddQuestion />
        <Footer />
      </Route>
      <Route path="/maketest">
        <Navbar />
        <MakeTest />
        <Footer />
      </Route>
      <Route path="/profile">
        {user ? (
          <>
            <Navbar />
            <Profile />
            <Footer />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/taketest">
        {state ? (
          state.startTime ? (
            <TestOnTime />
          ) : (
            <Taketest />
          )
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/result">
        <Navbar />
        <Result />
        <Footer />
      </Route>
      <Route path="/practice">
        <Navbar />
        <Practice />
        <Footer />
      </Route>
      <Route path="/">
        <Navbar />
        <Home />
        <Footer />
      </Route>
    </Switch>
  );
}

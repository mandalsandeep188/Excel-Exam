import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "../App.css";
import Home from "../screens/Home";
import Test from "../screens/Test";
import AddQuestion from "../screens/AddQuestion";
import MakeTest from "../screens/MakeTest";
import Navbar from "./Navbar";
import Taketest from "../screens/TakeTest";
import { UserContext } from "../App";

export default function Routing() {
  const history = useHistory();
  const { changeUser } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      changeUser({ type: "LOGIN", payload: user });
    } else {
      history.push("/");
    }
  }, []);
  return (
    <Switch>
      <Route path="/taketest">
        <Taketest />
      </Route>
      <Route path="/test">
        <Navbar />
        <Test />
      </Route>
      <Route path="/addquestion">
        <Navbar />
        <AddQuestion />
      </Route>
      <Route path="/maketest">
        <Navbar />
        <MakeTest />
      </Route>
      <Route path="/">
        <Navbar />
        <Home />
      </Route>
    </Switch>
  );
}

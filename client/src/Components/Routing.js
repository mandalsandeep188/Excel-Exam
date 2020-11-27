import React from "react";
import { Switch, Route } from "react-router-dom";
import "../App.css";
import Home from "../screens/Home";
import Test from "../screens/Test";
import AddQuestion from "../screens/AddQuestion";
import MakeTest from "../screens/MakeTest";
import Navbar from "./Navbar";
import Taketest from "../screens/TakeTest";

export default function Routing() {
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

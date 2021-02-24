import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { UserContext, QuestionContext } from "../App";
import Tabs from "../components/Tabs";
import Panel from "../components/Panel";
import TestsList from "../components/TestsList";
import Stats from "../components/Stats";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(QuestionContext);
  const [results, setResults] = useState([]);
  useEffect(() => {
    dispatch({ type: "SUBMIT" });
    fetch(`/getResults/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((err) => console.log(err));
  }, [dispatch, user]);
  return (
    <>
      <div className="container my-5">
        {user ? (
          <div className="row">
            <div className="col-md-5">
              <img
                className="img-fluid profile-pic mb-5"
                src={user.pic}
                alt="user"
              />
            </div>
            <div className="col-md-7 profile-info">
              <h1 className="mt-3">{user.name}</h1>
              <h6>{user.email}</h6>
              <h4 className="my-4 user-info">
                {user.type === "Student" ? (
                  <i className="fa fa-graduation-cap" />
                ) : user.type === "Teacher" ? (
                  <i className="fa fa-user" />
                ) : (
                  <i className="fa fa-cog" />
                )}
                <span>{user.type}</span>
              </h4>
            </div>
            <hr />
            <Tabs selected={0}>
              <Panel title="Tests">
                <TestsList results={results} />
              </Panel>
              <Panel title="Stats">
                <Stats results={results} />
              </Panel>
            </Tabs>
          </div>
        ) : (
          <div class="loader">
            <div class="spinner-grow text-primary" role="status"></div>
          </div>
        )}
      </div>
    </>
  );
}

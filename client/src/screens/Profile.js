import React, { useContext } from "react";
import "../App.css";
import { UserContext } from "../App";
import Tabs from "../components/Tabs";
import Panel from "../components/Panel";
import TestsList from "../components/TestsList";
import Stats from "../components/Stats";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="container my-5">
        {user ? (
          <div className="row">
            <div className="col-md-5">
              <img className="img-fluid profile-pic mb-3" src={user.pic} />
            </div>
            <div className="col-md-7">
              <h1 className="mt-3">{user.name}</h1>
              <h6>{user.email}</h6>
              <h4 className="my-4 user-info">
                <i className="fa fa-graduation-cap" />
                <span>Student</span>
              </h4>
              <button className="btn btn-primary">Contact</button>
            </div>
            <hr />
            <Tabs selected={0}>
              <Panel title="Tests">
                <TestsList />
              </Panel>
              <Panel title="Stats">
                <Stats />
              </Panel>
            </Tabs>
          </div>
        ) : (
          <div className="text-center">
            <div class="spinner-grow text-primary" role="status"></div>
          </div>
        )}
      </div>
    </>
  );
}

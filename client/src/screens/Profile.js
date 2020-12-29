import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

export default function Profile() {
  const { user, changeUser } = useContext(UserContext);
  return (
    <>
      <div className="container-fluid">
        <h1>Profile</h1>
        {user ? (
          <>
            <h5>Name: {user.name}</h5>
            <img className="img-fluid" src={user.pic} />
            <h5>Email: {user.email}</h5>
          </>
        ) : undefined}
      </div>
    </>
  );
}

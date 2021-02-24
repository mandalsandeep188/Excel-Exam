import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css";

export default function Root() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/getUsers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const makeTeacher = (user, i) => {
    fetch("/changeRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: user,
        role: "Teacher",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        let arr = [...users];
        let usr = { ...arr[i], type: "Teacher" };
        arr[i] = usr;
        setUsers(arr);
        toast.success("Promoted to teacher");
      });
  };
  const makeStudent = (user, i) => {
    fetch("/changeRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: user,
        role: "Student",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        let arr = [...users];
        let usr = { ...arr[i], type: "Student" };
        arr[i] = usr;
        setUsers(arr);
        toast.success("Changed back to student");
      });
  };

  return (
    <>
      <div className="container">
        <h2>Users</h2>
        <div>
          {users.length > 0 ? (
            users.map((usr, i) => {
              return (
                <div
                  className="row align-items-center my-2 py-2 border border-dark rounded"
                  key={usr._id}
                >
                  <div className="col-md-1 d-flex justify-content-center">
                    <img
                      className="img-fluid w-75 h-100 usr rounded-circle"
                      src={usr.pic}
                      alt="user"
                    />
                  </div>
                  <div className="col-md-3 text-center">
                    <h5>{usr.name}</h5>
                  </div>
                  <div className="col-md-3 text-center">
                    <h5>{usr.email}</h5>
                  </div>
                  <div className="col-md-2 text-center">
                    <h5>{usr.type}</h5>
                  </div>
                  <div className="col-md-2">
                    {usr.type === "Student" ? (
                      <button
                        className="btn change btn-primary"
                        onClick={() => makeTeacher(usr._id, i)}
                      >
                        Make Teacher
                      </button>
                    ) : usr.type === "Teacher" ? (
                      <button
                        className="btn change btn-primary"
                        onClick={() => makeStudent(usr._id, i)}
                      >
                        Make Student
                      </button>
                    ) : undefined}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center loader">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

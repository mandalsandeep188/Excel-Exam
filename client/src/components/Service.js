import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Service(props) {
  return (
    <div className="col-md-4">
      <Link to={`${props.path}`}>
        <div className="card service-card">
          <div
            className="card-body text-center"
            style={{ paddingBottom: "5px" }}
          >
            <i
              className={`fa fa-${props.icon} text-info`}
              aria-hidden="true"
            ></i>
          </div>
          <div className="card-body" style={{ paddingTop: "0" }}>
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

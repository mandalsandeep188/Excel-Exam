import React from "react";
import "../App.css";

export default function Toast(props) {
  return (
    <div
      className={`toast d-flex align-items-center text-white bg-${props.type} border-0`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-body">{props.message}</div>
      <button
        type="button"
        className="btn-close btn-close-white ms-auto me-2"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  );
}

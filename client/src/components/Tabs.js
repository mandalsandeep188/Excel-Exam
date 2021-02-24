import React, { useState } from "react";
import "../App.css";

export default function Tabs(props) {
  const [selected, setSelected] = useState(props.selected || 0);
  return (
    <div>
      <ul className="inline">
        {props.children.map((elem, index) => {
          let style = index === selected ? "selected" : "";
          return (
            <li
              className={style}
              key={index}
              onClick={() => setSelected(index)}
            >
              {elem.props.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{props.children[selected]}</div>
    </div>
  );
}

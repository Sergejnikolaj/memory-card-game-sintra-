import React from "react";
import "../index.scss";

export const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick} className={props.className}>
        {props.title}
      </button>
    </>
  );
};

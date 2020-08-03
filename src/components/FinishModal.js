import React from "react";
import "../index.scss";

export const FinishModal = (props) => {
  return <div className={props.className}>{props.message}</div>;
};

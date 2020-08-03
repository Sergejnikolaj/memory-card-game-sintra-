import React from "react";
import "../index.scss";

export const FinishModal = (props) => {
  const { className, message } = props;
  return <div className={className}>{message}</div>;
};

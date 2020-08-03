import React from "react";
import "../index.scss";

export const Button = (props) => {
  const { title, className, onClick } = props;
  return (
    <>
      <button onClick={onClick} className={className}>
        {title}
      </button>
    </>
  );
};

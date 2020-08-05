import React from "react";
import "../index.scss";

export const RecordDesk = (props) => {
  const { record } = props;
  return (
    <ol className="record-ol">
      <h2>TOP 5</h2>
      {record.map((item) => {
        return (
          <li key={item.id}>
            time: {item.count} / moves: {item.moves}
          </li>
        );
      })}
    </ol>
  );
};

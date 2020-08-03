import React, { useState } from "react";
import Desk from "./Desk";
import { Button } from "./Button";
import "../index.scss";

export const App = () => {
  const [started, handleStart] = useState(false);
  const [hidden, hideBtn] = useState(false);

  const startGame = () => {
    handleStart(true);
    hideBtn(true);
  };

  return (
    <div className="App">
      {!hidden && (
        <div className="start-game">
          <Button
            onClick={startGame}
            className="start-btn"
            title={"START GAME"}
          ></Button>
        </div>
      )}
      <div className="desk-wrap">{started && <Desk />}</div>
    </div>
  );
};

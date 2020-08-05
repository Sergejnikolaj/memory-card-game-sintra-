import React from "react";
import "../index.scss";
import { RecordDesk } from "./RecordDesk";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      resList: [],
    };
  }
  componentDidMount() {
    this.startTimer();
    const result = JSON.parse(localStorage.getItem("result"));
    if (result) {
      if (result.length > 1) {
        result.sort(function (a, b) {
          if (a.moves < b.moves) {
            return 1;
          }
          if (a.moves > b.moves) {
            return -1;
          }
          if (a.count > b.count) {
            return 1;
          }
          if (a.count < b.count) {
            return -1;
          }
          return 0;
        });
        if (result.length > 5) {
          result.length = 5;
        }
      }
      this.setState({ resList: result });
    }
  }
  componentDidUpdate() {
    const { gameOver, moves } = this.props;
    const { count } = this.state;
    if (gameOver) {
      const id = Date.now();
      const result = { id, count, moves };
      const resArr = this.state.resList.slice();
      resArr.push(result);
      localStorage.setItem("result", JSON.stringify(resArr));
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    const { gameOver } = this.props;
    const { count } = this.state;
    this.setState({ count: count + 1 });
    if (gameOver) {
      this.stopTimer();
    }
  }
  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  render() {
    const { count, resList } = this.state;
    return (
      <>
        <RecordDesk record={resList} />
        <div className="timer">
          <h1>Time: {count}</h1>
        </div>
      </>
    );
  }
}

export default Timer;

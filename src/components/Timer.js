import React from "react";
import "../index.scss";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    const { stop } = this.props;
    const { count } = this.state;
    this.setState({ count: count + 1 });
    if (stop === true) {
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
    const { count } = this.state;
    return (
      <div className="timer">
        <h1>Time: {count}</h1>
      </div>
    );
  }
}

export default Timer;

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
    this.setState({ count: this.state.count + 1 });
    if (this.props.stop === true) {
      this.stopTimer();
    }
  }
  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 3000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className="timer">
        <h1>Time: {this.state.count}</h1>
      </div>
    );
  }
}

export default Timer;

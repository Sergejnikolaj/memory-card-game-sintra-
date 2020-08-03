import React from "react";
import "../index.scss";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      compareValue: null,
      moves: 0,
    };
    this.flipToBack = this.flipToBack.bind(this);
    this.flipToFront = this.flipToFront.bind(this);
  }

  componentDidMount() {
    setTimeout(this.flipToBack, 1000);
  }

  flipToBack = () => {
    this.setState({ flipped: true });
  };

  flipToFront = () => {
    this.setState({ flipped: false });
    this.props.incrementMoves(this);

    if (
      this.props.memoryCard !== undefined &&
      this.props.group !== this.props.memoryCard.group
    ) {
      setTimeout(this.flipToBack, 1000);
    }
  };

  render() {
    return (
      <div className="page-container">
        <div
          onClick={this.flipToFront}
          className={"card-container" + (this.state.flipped ? " flipped" : "")}
        >
          <div
            className="front"
            style={{ backgroundImage: `'{$this.props.src}'` }}
          >
            <img src={this.props.src} />
          </div>
          <div className="back" style={{ backgroundColor: "black" }}>
            BACK
            {this.props.id}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

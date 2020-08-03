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
    setTimeout(this.flipToBack, 3000);
  }

  flipToBack = () => {
    this.setState({ flipped: true });
  };

  flipToFront = () => {
    const { incrementMoves, memoryCard, group } = this.props;
    this.setState({ flipped: false });
    incrementMoves(this);

    if (memoryCard !== undefined && group !== memoryCard.group) {
      setTimeout(this.flipToBack, 600);
    }
  };

  render() {
    const { src, id } = this.props;
    const { flipped } = this.state;
    return (
      <div className="page-container">
        <div
          onClick={this.flipToFront}
          className={"card-container" + (flipped ? " flipped" : "")}
        >
          <div className="front">
            <img src={src} />
          </div>
          <div className="back" />
        </div>
      </div>
    );
  }
}

export default Card;

import React from "react";
import Card from "./Card";
import Timer from "./Timer";
import { Button } from "./Button";
import { FinishModal } from "./FinishModal";
import "../index.scss";

class Desk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArr: [
        {
          id: "card-1",
          group: "Group 1",
          src:
            "https://vignette.wikia.nocookie.net/angrybirds/images/4/4e/170px-%D0%9A%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%87%D1%91%D1%80%D0%BD%D0%B0%D1%8F_%D0%BF%D1%82%D0%B8%D1%86%D0%B0.png/revision/latest/top-crop/width/300/height/300?cb=20130920064551&path-prefix=ru",
        },
        {
          id: "card-2",
          group: "Group 1",
          src:
            "https://vignette.wikia.nocookie.net/angrybirds/images/4/4e/170px-%D0%9A%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%87%D1%91%D1%80%D0%BD%D0%B0%D1%8F_%D0%BF%D1%82%D0%B8%D1%86%D0%B0.png/revision/latest/top-crop/width/300/height/300?cb=20130920064551&path-prefix=ru",
        },
        {
          id: "card-3",
          group: "Group 2",
          src:
            "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/CKUA_logo.svg/170px-CKUA_logo.svg.png",
        },
        {
          id: "card-4",
          group: "Group 2",
          src:
            "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/CKUA_logo.svg/170px-CKUA_logo.svg.png",
        },
        {
          id: "card-5",
          group: "Group 3",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/GeneralStar.svg/170px-GeneralStar.svg.png",
        },
        {
          id: "card-6",
          group: "Group 3",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/GeneralStar.svg/170px-GeneralStar.svg.png",
        },
        {
          id: "card-7",
          group: "Group 4",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Stemma_dell%27arte_del_Cambio.svg/170px-Stemma_dell%27arte_del_Cambio.svg.png",
        },
        {
          id: "card-8",
          group: "Group 4",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Stemma_dell%27arte_del_Cambio.svg/170px-Stemma_dell%27arte_del_Cambio.svg.png",
        },
        {
          id: "card-9",
          group: "Group single",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Coat_of_arms_of_Buzici_.svg/170px-Coat_of_arms_of_Buzici_.svg.png",
        },
      ],
      usedCards: [],
      moves: 0,
      memoryCard: [],
      falseCounter: 0,
      gameOver: false,
      startTimer: false,
      cardsOpened: 0,
      stopTimer: false,
    };
    this.incrementMoves = this.incrementMoves.bind(this);
    this.retryGame = this.retryGame.bind(this);
  }

  componentDidMount() {
    const shuffledCards = this.state.cardArr.sort(() => Math.random() - 0.5);
    this.setState({
      cardArr: shuffledCards,
      startTimer: true,
    });
  }

  incrementMoves(el) {
    if (!this.state.usedCards.includes(el.props.id)) {
      this.state.usedCards.push(el.props.id);
      this.setState({
        moves: this.state.moves + 1,
        cardsOpened: this.state.cardsOpened + 1,
      });
    }
    if (
      el.props.group !== "Group single" &&
      this.state.memoryCard.length == 0
    ) {
      const {
        props: { id, group },
      } = el;
      const newMemoryCard = { id, group };
      this.state.memoryCard.push(newMemoryCard);
      this.setState({ cardsOpened: this.state.cardsOpened + 1 });
    } else if (
      this.state.memoryCard[0] !== undefined &&
      this.state.memoryCard[0].group === el.props.group &&
      this.state.memoryCard[0].id !== el.props.id
    ) {
      this.setState({ memoryCard: [] });
    } else if (
      el.props.group === "Group single" &&
      this.state.memoryCard.length == 0
    ) {
      this.setState({
        memoryCard: [],
        cardsOpened: this.state.cardsOpened + 1,
      });
    } else if (this.state.memoryCard[0].group !== el.props.group) {
      this.setState({ moves: this.state.moves + 1 });
      this.setState({ falseCounter: this.state.falseCounter + 1 });
      if (this.state.falseCounter === 2) {
        this.setState({
          gameOver: true,
          stopTimer: true,
        });
      }
    } else if (this.state.memoryCard[0].id === el.props.id) {
    } else if (this.state.cardsOpened > 8) {
      this.setState({
        stopTimer: true,
      });
    } else {
      alert("SOMETHING WRONG :(");
    }
  }

  retryGame() {
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        {(this.state.gameOver || this.state.cardsOpened > 8) && (
          <Button
            title={"RETRY GAME"}
            className={"retry-btn"}
            onClick={this.retryGame}
          />
        )}
        {this.state.startTimer && (
          <Timer stop={this.state.stopTimer || this.state.cardsOpened > 8} />
        )}
        <div className="moves-qty">
          <h1>Moves: {this.state.moves}</h1>
        </div>
        <div className="desk">
          {this.state.cardArr.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                group={card.group}
                memoryCard={this.state.memoryCard[0]}
                incrementMoves={this.incrementMoves}
                src={card.src}
              />
            );
          })}
        </div>
        <div>
          {this.state.gameOver ? (
            <FinishModal className={"game-over"} message={"GAME OVER"} />
          ) : this.state.cardsOpened > 8 ? (
            <FinishModal className={"player-won"} message={"YOU WON"} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Desk;

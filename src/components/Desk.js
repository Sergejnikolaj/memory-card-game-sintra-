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
    const {
      usedCards,
      moves,
      cardsOpened,
      memoryCard,
      falseCounter,
    } = this.state;
    const {
      props: { id, group },
    } = el;
    const newMemoryCard = { id, group };

    if (!usedCards.includes(id)) {
      usedCards.push(id);
      this.setState({
        moves: moves + 1,
        cardsOpened: cardsOpened + 1,
      });
    }
    if (group !== "Group single" && memoryCard.length == 0) {
      memoryCard.push(newMemoryCard);
      this.setState({ cardsOpened: cardsOpened + 1 });
    } else if (
      memoryCard[0] !== undefined &&
      memoryCard[0].group === el.props.group &&
      memoryCard[0].id !== id
    ) {
      this.setState({ memoryCard: [] });
    } else if (group === "Group single" && memoryCard.length == 0) {
      this.setState({
        memoryCard: [],
        cardsOpened: cardsOpened + 1,
      });
    } else if (memoryCard[0].group !== group) {
      this.setState({ moves: moves + 1 });
      this.setState({ falseCounter: falseCounter + 1 });
      if (falseCounter === 2) {
        this.setState({
          gameOver: true,
        });
      }
    } else if (memoryCard[0].id === id) {
    } else if (cardsOpened > 8) {
      this.setState({
        gameOver: true,
      });
    } else {
      alert("SOMETHING WRONG :(");
    }
  }

  retryGame() {
    window.location.reload(false);
  }

  render() {
    const {
      gameOver,
      cardsOpened,
      startTimer,
      moves,
      cardArr,
      memoryCard,
    } = this.state;
    return (
      <div>
        {(gameOver || cardsOpened > 8) && (
          <div className="game-control retry-game">
            <Button
              title={"RETRY GAME"}
              className={"retry-btn"}
              onClick={this.retryGame}
            />
          </div>
        )}
        {startTimer && (
          <Timer moves={moves} gameOver={gameOver || cardsOpened > 8} />
        )}
        <div className="moves-qty">
          <h1>Moves: {moves}</h1>
        </div>
        <div className="desk">
          {cardArr.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                group={card.group}
                memoryCard={memoryCard[0]}
                incrementMoves={this.incrementMoves}
                src={card.src}
              />
            );
          })}
        </div>
        <div>
          {gameOver ? (
            <FinishModal className={"game-over"} message={"GAME OVER"} />
          ) : cardsOpened > 8 ? (
            <FinishModal className={"player-won"} message={"YOU WON"} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Desk;

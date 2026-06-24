import { useState } from "react";

import Board from "./Board";

const Game = () => {
  const [square, setSquare] = useState([Array(9).fill(null)]);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const currentSquare = history[currentMove];

  const handlePlay = (nxtSqr) => {
    const nextHistory = [...history.splice(0, currentMove + 1), nxtSqr];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const JumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) description = "Go to move #" + move;
    else description = "Restart the game";

    return (
      <li key={move} >
        <button onClick={() => JumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
        <Board
          xIsNext={xIsNext}
          square={currentSquare}
          setSquare={setSquare}
          onPlay={handlePlay}
        />
      <div className="history">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;

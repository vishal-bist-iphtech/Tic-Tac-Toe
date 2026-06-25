import { useState } from "react";

import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const currentSquare = history[currentMove];

  const handlePlay = (nxtSqr) => {
    const nextHistory = [...history.splice(0, currentMove + 1), nxtSqr];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  // winner function
  const calculateWinner = (square) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; ++i) {
      const [a, b, c] = lines[i];

      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }

    return null;
  };

  // status variable to show the status of the game
  let status;
  const winner = calculateWinner(currentSquare);

  if (winner) status = "Winner: " + winner;
  else status = "Next Player: " + (xIsNext ? "X" : "O");

  const JumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) description = "Go to move #" + move;
    else description = "Restart the game";

    
    if (move >= 9 && !winner) status = "Game Draw!!";

    return (
      <li key={move}>
        <button onClick={() => JumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <Board
        xIsNext={xIsNext}
        square={currentSquare}
        onPlay={handlePlay}
        status={status}
        calculateWinner={calculateWinner}
      />
      <div className="history">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;

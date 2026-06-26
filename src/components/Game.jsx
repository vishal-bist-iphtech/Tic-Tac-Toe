import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [matchedSquare, setMatchedSquare] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

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
        return { winner: square[a], winningSquares: [a, b, c] };
      }
    }

    return { winner: null, winningSquares: null };
  };

  const handlePlay = (nxtSqr) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nxtSqr];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    // Check for winner after each move
    const result = calculateWinner(nxtSqr);
    if (result.winner) {
      setMatchedSquare(result.winningSquares);
    } else {
      setMatchedSquare(null);
    }
  };

  // Check for draw
  const isDraw = (square) => {
    return square.every(cell => cell !== null);
  };

  // Calculate winner and draw status
  const result = calculateWinner(currentSquare);
  const winner = result.winner;
  const winningSquares = result.winningSquares;

  // Update matched squares when winner changes
  if (winner && !matchedSquare) {
    setMatchedSquare(winningSquares);
  } else if (!winner && matchedSquare) {
    setMatchedSquare(null);
  }

  // Status logic
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw(currentSquare)) {
    status = "Game Draw!!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const JumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    // Reset matched squares when jumping
    setMatchedSquare(null);
  };

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) description = "Go to move #" + move;
    else description = "Restart the game";

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
        matchedSquare={matchedSquare}
      />
      <div className="history">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
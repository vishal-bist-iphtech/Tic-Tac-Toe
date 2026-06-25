const Board = ({ xIsNext, square, onPlay }) => {
  // helper function to slice rows from the square array
  const createBoardRows = () => {
    const rows = [];
    for (let i = 0; i < 9; i += 3) {
      rows.push(square.slice(i, i + 3));
    }
    return rows;
  };

  // square blocks for the board
  const renderSquares = () => {
    return (
      <>
        {createBoardRows().map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((value, colIndex) => {
              const index = rowIndex * 3 + colIndex;
              return (
                <button
                  key={index}
                  className="square"
                  onClick={() => handleClick(index)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  const handleClick = (i) => {
    if (square[i] || calculateWinner(square)) return;

    const nxtSqr = square.slice();

    if (xIsNext) {
      nxtSqr[i] = "X";
    } else {
      nxtSqr[i] = "O";
    }

    onPlay(nxtSqr);

    console.log("history",history);
    console.log("square",square);
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

  const winner = calculateWinner(square);
  let status;

  if (winner) status = "Winner: " + winner;
  // else if(square.length >=9)
  //     status = 'Game Draw!!';
  else status = "Next Player: " + (xIsNext ? "X" : "O");

  return (
    <div className="board">
      <h2 className="status">{status}</h2>
      {renderSquares()}
    </div>
  );
};

export default Board;

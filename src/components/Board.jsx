const Board = ({ xIsNext, square, onPlay, status, calculateWinner}) => {
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
  };

  return (
    <div className="board">
      <h2 className="status">{status}</h2>
      {renderSquares()}
    </div>
  );
};

export default Board;

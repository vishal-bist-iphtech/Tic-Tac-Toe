// square blocks for the board
const Square = ( {value, onSquareClick}) => {

    return (
      <button className="square" onClick={onSquareClick}>{value}</button>
    )
  }


  
  
  
  
  const Board = ({xIsNext, square, setSquare, onPlay}) => {    

    const handleClick = (i) => {
  
          if(square[i] || calculateWinner(square))
                  return;
  
          const nxtSqr = square.slice();
          
          if(xIsNext){
                  nxtSqr[i] = 'X';
          }
          else{
                  nxtSqr[i] = 'O';
              }

          onPlay(nxtSqr);
          
          setSquare(nxtSqr);
      }

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
        [2, 4, 6]
      ];
    
      for(let i = 0; i < lines.length; ++i){
        const [a,b,c] = lines[i];
    
        if(square[a] && square[a] === square[b] && square[a] === square[c]){
            return square[a];
          }
      }
    
      return null;
    }


  const winner = calculateWinner(square);
  let status;
  
  if(winner)
      status = 'Winner: '+ winner;
  // else if(square.length >=9)
  //     status = 'Game Draw!!';
  else
      status = 'Next Player: '+ (xIsNext ? 'X' : 'O');


    
  return (
    <div className="board">
        <h2 className="status">{status}</h2>
        <div className="board-row">
            <Square value={square[0]} onSquareClick={()=>handleClick(0)}/>
            <Square value={square[1]} onSquareClick={()=>handleClick(1)}/>
            <Square value={square[2]} onSquareClick={()=>handleClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={square[3]} onSquareClick={()=>handleClick(3)}/>
            <Square value={square[4]} onSquareClick={()=>handleClick(4)}/>
            <Square value={square[5]} onSquareClick={()=>handleClick(5)}/>
            
        </div>
        <div  className="board-row">
            <Square value={square[6]} onSquareClick={()=>handleClick(6)}/>
            <Square value={square[7]} onSquareClick={()=>handleClick(7)}/>
            <Square value={square[8]} onSquareClick={()=>handleClick(8)}/>
        </div>
        
    </div>
  )
}

export default Board
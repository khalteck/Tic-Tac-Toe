import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import x from "./images/icons8-x-64.png";
import o from "./images/icons8-o-lowercase-26.png";

function Header(props) {
  return(
    <nav className='header'>
      <p>Tic Tac Toe game</p>
    </nav>
  );
}

function SideNav(props) {
  return (
    <div className='bottom-nav'>
      <div className='icon-hold'>
        <button className='each' id='x'>
          Player 1<br/>
          <img className='icon' src={x} alt=''/>
        </button>
        <button className='each' id='o'>
          player 2<br/>
          <img className='icon' src={o} alt=''/>
        </button>
      </div>
    </div>
  )
}
   function Square(props) {
    return (
      <button className="square"
         onClick={() => { props.onClick() }}
         >
          {props.value}
        </button>
    );
   }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value= {this.props.squares[i]}
          onClick={() => {this.props.onClick(i)}}
        />
      );
    }
  
    render() {
      return (
        <div className='board'>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O"; //tenary operator
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({  
        stepNumber: step,  
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <div key={move}>
                <button className='each-move' 
                onClick={
                  () => {
                    this.jumpTo(move);
                  }
                }>{desc}</button>
            </div>
        );
      });
      let status;
      if (winner) {
        status = 'Player ' + winner + ' Wins!!';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <Header/>
          <SideNav/>
          <div className="game-board">
            <div className='status'>{status}</div>
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className='hold-move'>{moves}</div>
          </div>
        </div>
      );
    }
  }
  
  
  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
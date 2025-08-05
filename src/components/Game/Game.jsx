import React, { useState } from "react";
import "./Game.css";
import { INITIAL_BOARD_STATE } from "./Constants.jsx";

const Game = () => {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(INITIAL_BOARD_STATE);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setPlayer("X");
    setBoard(INITIAL_BOARD_STATE);
    setGameOver(false);
  };

  const rotatePlayer = () => {
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const checkWinningCondition = (indexRow, indexCol, board) => {
    // check Row
    if (
      board[indexRow][0] === board[indexRow][1] &&
      board[indexRow][1] === board[indexRow][2]
    )
      return true;
    // check Col
    if (
      board[0][indexCol] === board[1][indexCol] &&
      board[1][indexCol] === board[2][indexCol]
    )
      return true;
    // check diagonal
    if (
      board[1][1] !== "" &&
      ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
    )
      return true;
    return false;
  };

  const handleOnCellClick = (indexRow, indexCol) => {
    if (!gameOver && board[indexRow][indexCol] === "") {
      const boardCopy = JSON.parse(JSON.stringify(board));
      boardCopy[indexRow][indexCol] = player;
      setBoard(boardCopy);
      var win = checkWinningCondition(indexRow, indexCol, boardCopy);
      console.log(INITIAL_BOARD_STATE);
      if (!win) {
        rotatePlayer();
      } else {
        setGameOver(true);
      }
    }
  };

  const renderRow = (indexRow) => {
    return (
      <div className="gameBoardRow">
        <div className="cell" onClick={() => handleOnCellClick(indexRow, 0)}>
          {board[indexRow][0]}
        </div>
        <div className="cell" onClick={() => handleOnCellClick(indexRow, 1)}>
          {board[indexRow][1]}
        </div>
        <div className="cell" onClick={() => handleOnCellClick(indexRow, 2)}>
          {board[indexRow][2]}
        </div>
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="gameBoard">
        {renderRow(0)}
        {renderRow(1)}
        {renderRow(2)}
      </div>
    );
  };

  const renderGameHeader = () => {
    if (!gameOver) return `It's player ${player}'s turn`;

    return (
      <>
        Player {player} has won
        <button className="playAgain" onClick={() => resetGame()}>
          Play again?
        </button>
      </>
    );
  };

  return (
    <div className="game">
      <div className="gameHeader">{renderGameHeader()}</div>
      {renderBoard()}
    </div>
  );
};

export default Game;

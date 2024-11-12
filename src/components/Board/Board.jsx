import { useState, useEffect } from 'react';
import styles from './Board.module.css';

export default function Board() {
  // 1. State for 8x8 grid
  const [boardState, setBoardState] = useState([]);
  const [offBoardState, setOffBoardState] = useState([]);

  // 2. Initialize board
  useEffect(() => {
    const initialBoard = createEmptyBoard();
    const initialOffBoard = createOffBoard();
    placeItems(initialBoard, 'coin', 8);   // Place 8 coins
    placeItems(initialBoard, 'object', 6);// Place 6 objects
    setBoardState(initialBoard);
    setOffBoardState(initialOffBoard);
  }, []);

  // 3. Helper function: create 8x8 2D array filled with empty cells
  const createEmptyBoard = () => {
    return Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => ({ type: 'empty', occupied: false }))
    );
  };

  const createOffBoard = () => {
    return Array.from({ length: 8 }, () =>
      Array.from({ length: 5 }, () => ({ type: 'empty', occupied: false }))
    );
  };


  const placeItems = (board, itemType, count) => {
    for (let i = 0; i < count; i++) {
      let rowIndex = Math.floor(Math.random() * 8);
      let colIndex = Math.floor(Math.random() * 8);

      if (board[rowIndex][colIndex].occupied === true) {
        i--;
      } else {
        board[rowIndex][colIndex] = { type: itemType, occupied: true };
        if (board[rowIndex][colIndex].type === 'object') {
          if (rowIndex < 7) {
            board[rowIndex+1][colIndex].occupied = true;
          }
          if (rowIndex > 0) {
            board[rowIndex-1][colIndex].occupied = true;
          }

          if (colIndex < 7) {
            board[rowIndex][colIndex+1].occupied = true;
          }
          if (colIndex > 0) {
            board[rowIndex][colIndex-1].occupied = true;
          }
        }
      }
    }
  }

  // 5. Render the board as an 8x8 grid of cells
  return (
    <div className={styles.wholeBoard}>

      <div className={styles.board}>
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.boardRow}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${styles.cell} ${styles[cell.type]}`}
              >
                {cell.type === 'object' ? '📦' : cell.type === 'coin' ? '💰' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.offBoard}>
        {offBoardState.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.boardRow}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={styles.offCell}
              >
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

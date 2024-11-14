import { useState, useEffect } from 'react';
import styles from './Board.module.css';
import ShapeSelection from '../ShapeSelection/ShapeSelection'
import { Shapes } from '../../utils/shapes';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig'
import PropTypes from 'prop-types';

export default function Board({
  handleStartDragging,
  handleStopDragging
}) {
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

  console.log(Shapes)

  const shapeForms = Object.keys(Shapes);

  console.log('Shape Letters', shapeForms);


  const shuffledShapes = (shapeForms) => {
    let oldElement;
    for (let i= shapeForms.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = shapeForms[i];
      shapeForms[i] = shapeForms[rand];
      shapeForms[rand] = oldElement;
    }
    return shapeForms;
  }

  const shuffledArray = shuffledShapes([...shapeForms]);


  const [shapes, setShapes] = useState([
    Shapes[shuffledArray[0]],
    Shapes[shuffledArray[1]],
    Shapes[shuffledArray[2]]
  ]);

  const handleRotate = () => {
    const newShapes = shapes.map(shape => rotate90Deg(shape));
    setShapes(newShapes);
  };

  const handleFlip = () => {
    const newShapes = shapes.map(shape => flipHorizontal(shape));
    setShapes(newShapes);
  };

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

      <div className={styles.shapeButtons}>
        <button onClick={handleRotate}>Rotate</button>
        <button onClick={handleFlip}>Flip</button>
      </div>

      <div className={styles.shapeSelection}>
        <ShapeSelection
          rndShape={shapes[0]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          rndShape={shapes[1]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        {/* <ShapeSelection
          rndShape={shapes[2]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        /> */}
      </div>

    </div>
  );
}

Board.propTypes = {
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired
}

import { useState, useEffect } from 'react';
import styles from './Board.module.css';
import ShapeSelection from '../ShapeSelection/ShapeSelection'
import { Shapes } from '../../utils/shapes';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig'
import PropTypes from 'prop-types';

export default function Board({
  handleStartDragging,
  handleStopDragging,
  cellX,
  cellY,
  setCellX,
  setCellY
}) {
  const [boardState, setBoardState] = useState([]);

  // 2. Initialize board
  useEffect(() => {
    const initialBoard = createFullGrid();
    console.log("Board-IDs", initialBoard);

    placeItems(initialBoard, 'coin', 8);   // Place 8 coins
    placeItems(initialBoard, 'object', 6);// Place 6 objects
    setBoardState(initialBoard);
  }, []);


  const createFullGrid = () => {
    return Array.from({ length: 13 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, colIndex) => ({
        id: `r${rowIndex}-c${colIndex}`,
        type: rowIndex < 8 ? 'board' : 'offBoard',
        occupied: false
      }))
    );
  };


  const placeItems = (board, itemType, count) => {
    for (let i = 0; i < count; i++) {
      // Zufällige Position im "board"-Bereich wählen (8x8)
      let rowIndex = Math.floor(Math.random() * 8);  // Nur im Bereich von 0 bis 7
      let colIndex = Math.floor(Math.random() * 8);

      // Überprüfen, ob die Zelle belegt ist
      if (board[rowIndex][colIndex].occupied) {
        i--; // Falls belegt, versuche es erneut
      } else {
        // Die Zelle mit dem Item füllen und besetzen
        board[rowIndex][colIndex] = { id: `r${rowIndex}-c${colIndex}`, type: itemType, occupied: true };

        // Falls es sich um ein 'object' handelt, benachbarte Zellen markieren
        if (itemType === 'object') {
          // Nachbarzellen im board-Bereich prüfen und als besetzt markieren
          if (rowIndex < 7) board[rowIndex + 1][colIndex].occupied = true; // Unten
          if (rowIndex > 0) board[rowIndex - 1][colIndex].occupied = true; // Oben
          if (colIndex < 7) board[rowIndex][colIndex + 1].occupied = true; // Rechts
          if (colIndex > 0) board[rowIndex][colIndex - 1].occupied = true; // Links
        }
      }
    }
  };

  const shapeForms = Object.keys(Shapes);


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
    // Shapes[shuffledArray[1]],
    // Shapes[shuffledArray[2]]
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
    <div>

      <section className={styles.boardContainer}>

        <div className={styles.board}>
          {/* Rendern des Boards */}
          {console.log('BOARDSTATE', boardState)}
          {boardState.map((row, rowIndex) =>
            row.map((cell, colIndex) => ( // Fixed variable name (was `col`, should be `cell`)
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${rowIndex < 8 ? styles.boardCell : styles.offCell} ${styles[cell.type]}`}
                id={cell.id} // Jede Zelle hat nun eine eindeutige ID
              >
                {/* Zeige das Item innerhalb der Zelle an */}
                {cell.type === 'object' ? '📦' : cell.type === 'coin' ? '💰' : ''}
              </div>
            ))
          )}
        </div>

        {/* ShapeSelection für die draggable Teile im OffBoard-Bereich */}
        <div className={styles.shapeSelection}>
          {shapes.map((shape, index) => (
            <ShapeSelection
              key={index}
              rndShape={shape}
              handleStartDragging={handleStartDragging}
              handleStopDragging={handleStopDragging}
              cellX={cellX} // Pass down cellX state
              setCellX={setCellX} // Pass down cellX state
              cellY={cellY} // Pass down cellY state
              setCellY={setCellY} // Pass down cellY state
              boardState={boardState} // Pass down boardState
            />
          ))}
        </div>

      </section>

      <div className={styles.shapeButtons}>
        <button onClick={handleRotate}>Rotate</button>
        <button onClick={handleFlip}>Flip</button>
      </div>

    </div>
  );
}

Board.propTypes = {
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired,
  cellX: PropTypes.number,
  setCellX: PropTypes.func,
  cellY: PropTypes.number,
  setCellY: PropTypes.func
}

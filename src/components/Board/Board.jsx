import { useState, useEffect } from 'react';
import styles from './Board.module.css';
import ShapeSelection from '../ShapeSelection/ShapeSelection';
import PropTypes from 'prop-types';

export default function Board({
  handleStartDragging,
  handleStopDragging,
  handleFlip,
  handleRotate,
  cellX,
  cellY,
  setCellX,
  setCellY,
  shape,
  isValid
}) {
  const [boardState, setBoardState] = useState([]);

  // 2. Initialize board
  useEffect(() => {
    const initialBoard = createFullGrid();
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


  // 5. Render the board as an 8x8 grid of cells
  return (
    <div>

      <section className={styles.boardContainer}>

        <div className={styles.board}>
          {/* Rendern des Boards */}
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
            <ShapeSelection
              shapeGrid={shape}
              handleStartDragging={handleStartDragging}
              handleStopDragging={handleStopDragging}
              cellX={cellX} // Pass down cellX state
              setCellX={setCellX} // Pass down cellX state
              cellY={cellY} // Pass down cellY state
              setCellY={setCellY} // Pass down cellY state
              boardState={boardState} // Pass down boardState
              isValid={isValid} // Pass down isValid state
            />

        </div>

      </section>

      <div className={styles.shapeButtons}>
        <button onClick={() => handleRotate(boardState)}>Rotate</button>
        <button onClick={() => handleFlip(boardState)}>Flip</button>
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
  setCellY: PropTypes.func,
  handleFlip: PropTypes.func.isRequired,
  handleRotate: PropTypes.func.isRequired,
  shape: PropTypes.array.isRequired,
  isValid: PropTypes.bool.isRequired
}

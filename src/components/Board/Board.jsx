import { useEffect } from 'react';
import styles from './Board.module.css';
import ShapeSelection from '../ShapeSelection/ShapeSelection';
import PropTypes from 'prop-types';
import cherryImage from '../../assets/illus/cheryTransparent.png';
import checkGameEnd from '../../utils/checkGameEnd';

export default function Board({
  handleStartDragging,
  handleStopDragging,
  handleFlip,
  handleRotate,
  shape,
  isValid,
  handleConfirmPlacement,
  dragCoordinatesRef,
  setCells,
  boardState,
  setBoardState,
  coins,
  handleReroll,
  boardCoins,
  boardObjects,
  objectsRef, // an array of all the objects
  // setGameEnded,
  // showRerollPrompt,
  restart
}) {

  // 2. Initialize board
  useEffect(() => {
    objectsRef.current = [];
    const initialBoard = createFullGrid();
    placeItems(initialBoard, 'coin', boardCoins);   // Place 8 coins
    placeItems(initialBoard, 'object', boardObjects);// Place 12 objects
    setBoardState(initialBoard);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);


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
          objectsRef.current.push(board[rowIndex][colIndex]);
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
    <>
      <div className={styles.shapeButtons}>
        <button onClick={() => handleRotate(boardState)} className={styles.userBtn}>rotate</button>
        <button onClick={() => handleFlip(boardState)} className={styles.userBtn}>Flip</button>
        {coins > 0 && (
          <button
            onClick={() => handleReroll()}
            className={checkGameEnd(shape, boardState) ? styles.userPromptBtn : styles.userBtn}
          >
            Reroll 🧁
          </button>
        )}
      </div>

      <div>
        <section className={styles.boardContainer}>

          <div className={styles.board}>
            {/* Rendern des Boards */}
            {boardState.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${rowIndex < 8 ? styles.boardCell : styles.offCell} ${styles[cell.type]} ${
                    cell.type === 'cake' ? styles.shapeCell : ''
                  }`}
                  id={cell.id} // Jede Zelle hat nun eine eindeutige ID
                >
                  {/* Zeige das Item innerhalb der Zelle an */}
                  {cell.type === 'object'
                    ?
                      <div className={styles.cherrys}>
                        <img src={cherryImage} alt="Cherry" className={styles.cherryOnTop} />
                      </div>

                    : cell.type === 'coin'
                    ? <div className={styles.cupCakes}>
                      🧁
                      </div>

                    : ''}
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
                boardState={boardState} // Pass down boardState
                isValid={isValid} // Pass down isValid state
                handleConfirmPlacement={handleConfirmPlacement} // Pass down handleConfirmPlacement function
                dragCoordinatesRef={dragCoordinatesRef} // Pass down dragCoordinatesRef state
                setCells={setCells}
              />

          </div>

        </section>
      </div>
    </>
  );
}

Board.propTypes = {
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired,
  handleFlip: PropTypes.func.isRequired,
  handleRotate: PropTypes.func.isRequired,
  shape: PropTypes.array.isRequired,
  isValid: PropTypes.object.isRequired,
  handleConfirmPlacement: PropTypes.func.isRequired,
  dragCoordinatesRef: PropTypes.object.isRequired,
  setCells: PropTypes.func.isRequired,
  boardState: PropTypes.array.isRequired,
  setBoardState: PropTypes.func.isRequired,
  coins: PropTypes.number.isRequired,
  handleReroll: PropTypes.func.isRequired,
  boardCoins: PropTypes.number.isRequired,
  boardObjects: PropTypes.number.isRequired,
  objectsRef: PropTypes.object.isRequired,
  setGameEnded: PropTypes.func.isRequired,
  showRerollPrompt: PropTypes.bool.isRequired,
  restart: PropTypes.bool.isRequired
}

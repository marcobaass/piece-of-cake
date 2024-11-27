import { useState, useRef } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';
import { validatePlacement, placeTile } from '../../utils/validatePlacement.js';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig';
import { Shapes } from '../../utils/shapes';

function App() {
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [cells, setCells] = useState({})
  const draggingStates = useRef(false);
  const isValid = useRef(false);
  const dragCoordinatesRef = useRef({ x: null, y: null });

  const shapeForms = Object.keys(Shapes);
  const rndShape = Math.floor(Math.random() * shapeForms.length);
  const shapeKey = shapeForms[rndShape];
  const [shape, setShape] = useState(Shapes[shapeKey]);
  console.log(shape);

  const handleStartDragging = () => {
    draggingStates.current = true;
  };

  // Handler for stopping the drag (for a specific shape index)
  const handleStopDragging = (x, y, rndShape, boardState) => {
    draggingStates.current = false;
    const { check, collectedCoins } = validatePlacement(x, y, rndShape, boardState);
    isValid.current = check;
    setCoins(coins + collectedCoins); // temporary - must apply only when confirmed!!!
    console.log(isValid.current);
    console.log(coins);
  };

  const handleRotate = (boardState) => {
    const rotatedShape = rotate90Deg(shape);
    setShape(rotatedShape);
    console.log('Board in handleRotate', boardState);
    const { check, collectedCoins } = validatePlacement(dragCoordinatesRef.current.x, dragCoordinatesRef.current.y, rotatedShape, boardState);
    isValid.current = check;
    setCoins(coins + collectedCoins); // temporary - must apply only when confirmed!!!
    console.log(isValid.current);
    console.log(coins);
  };

  const handleFlip = (boardState) => {
    const flippedShape = flipHorizontal(shape);
    setShape(flippedShape);
    const { check, collectedCoins } = validatePlacement(dragCoordinatesRef.current.x, dragCoordinatesRef.current.y, flippedShape, boardState);
    isValid.current = check;
    setCoins(coins + collectedCoins); // temporary - must apply only when confirmed!!!
    console.log(isValid.current);
    console.log(coins);
  };

  const handleConfirmPlacement = (x, y, rndShape, boardState) => {
    placeTile(x, y, rndShape, boardState);
  }



  return (
    <div className={styles.app}>
      <PlayerUI
        coins={coins}
        setCoins={setCoins}
        score={score}
        setScore={setScore}
      />
      <Board
        draggingStates={draggingStates} // Pass down dragging states
        handleStartDragging={handleStartDragging} // Pass down handleStart function
        handleStopDragging={handleStopDragging} // Pass down handleStop function
        handleFlip={handleFlip}
        handleRotate={handleRotate}
        shape={shape} // Pass down shapes state
        isValid={isValid}
        handleConfirmPlacement={handleConfirmPlacement} // Pass down handleConfirmPlacement function
        dragCoordinatesRef={dragCoordinatesRef}
        setCells={setCells} // Pass down setCells function to update the board cells array
      />
    </div>
  )
}

export default App

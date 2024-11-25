import { useState, useRef } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';
import { validatePlacement } from '../../utils/validatePlacement.js';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig';
import { Shapes } from '../../utils/shapes';

function App() {
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const draggingStates = useRef(false);
  const [cellX, setCellX] = useState(0);
  const [cellY, setCellY] = useState(0);

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
    validatePlacement(x, y, rndShape, boardState);
  };

  const handleRotate = (boardState) => {
    const rotatedShape = rotate90Deg(shape);
    setShape(rotatedShape);
    console.log('Board in handleRotate', boardState);

    validatePlacement(cellX, cellY, rotatedShape, boardState);
  };

  const handleFlip = (boardState) => {
    const flippedShape = flipHorizontal(shape);
    setShape(flippedShape);
    validatePlacement(cellX, cellY, flippedShape, boardState);
  };



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
        cellX={cellX} // Pass down cellX state
        setCellX={setCellX} // Pass down cellX state
        cellY={cellY} // Pass down cellY state
        setCellY={setCellY} // Pass down cellY state
        handleFlip={handleFlip}
        handleRotate={handleRotate}
        shape={shape} // Pass down shapes state
      />
    </div>
  )
}

export default App

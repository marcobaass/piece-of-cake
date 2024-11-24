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
  const draggingStates = useRef([false, false, false]);
  const [cellX, setCellX] = useState(0);
  const [cellY, setCellY] = useState(0);

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

  const handleStartDragging = (index) => {
    draggingStates.current[index] = true;
  };

  // Handler for stopping the drag (for a specific shape index)
  const handleStopDragging = (x, y, rndShape, boardState, index) => {
    draggingStates.current[index] = false;
    validatePlacement(x, y, rndShape, boardState);
  };

  const handleRotate = (x, y, rndShape, boardState) => {
    const newShapes = shapes.map(shape => rotate90Deg(shape));
    setShapes(newShapes);
    validatePlacement(x, y, newShapes[0], boardState);
  };

  const handleFlip = () => {
    const newShapes = shapes.map(shape => flipHorizontal(shape));
    setShapes(newShapes);
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
        shapes={shapes} // Pass down shapes state
      />
    </div>
  )
}

export default App

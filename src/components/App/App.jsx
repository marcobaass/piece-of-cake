import { useState, useRef } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';
import { validatePlacement } from '../../utils/validatePlacement.js';

function App() {
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const draggingStates = useRef([false, false, false]);
  const [cellX, setCellX] = useState(0);
  const [cellY, setCellY] = useState(0);

  const handleStartDragging = (index) => {
    draggingStates.current[index] = true;
  };

  // Handler for stopping the drag (for a specific shape index)
  const handleStopDragging = (x, y, rndShape, boardState, index) => {
    draggingStates.current[index] = false;
    validatePlacement(x, y, rndShape, boardState);
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
      />
    </div>
  )
}

export default App

import { useState, useRef } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';

function App() {
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const draggingStates = useRef([false, false, false]);

  const handleStartDragging = (index) => {
    draggingStates.current[index] = true; // Set the dragged shape as true
  };

  // Handler for stopping the drag (for a specific shape index)
  const handleStopDragging = (index) => {
    draggingStates.current[index] = false; // Reset the dragged shape to false
  };

  return (
    <div className={styles.app}>
      <PlayerUI
        coins={coins}
        setCoins={setCoins}
        score={score}
        setScore={setScore}
        draggingStates={draggingStates} // Pass down dragging states
        handleStartDragging={handleStartDragging} // Pass down handleStart function
        handleStopDragging={handleStopDragging} // Pass down handleStop function
      />
      <Board />
    </div>
  )
}

export default App

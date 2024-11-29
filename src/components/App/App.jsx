import { useState, useRef } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';
import { validatePlacement, placeTile, updateBoard } from '../../utils/validatePlacement.js';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig';
import { Shapes } from '../../utils/shapes';

function App() {
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [cells, setCells] = useState({})
  const [boardState, setBoardState] = useState([]);
  const draggingStates = useRef(false);
  const isValid = useRef(false);
  const dragCoordinatesRef = useRef({ x: 1, y: 9 });

  const shapeForms = Object.keys(Shapes);
  const rndShape = Math.floor(Math.random() * shapeForms.length);
  const shapeKey = shapeForms[rndShape];
  const [shape, setShape] = useState(Shapes[shapeKey]);

  const handleStartDragging = () => {
    draggingStates.current = true;
  };

  // Handler for stopping the drag (for a specific shape index)
  const handleStopDragging = (x, y, rndShape, boardState) => {
    draggingStates.current = false;
    const check = validatePlacement(x, y, rndShape, boardState);
    isValid.current = check;
    console.log(isValid.current);
    console.log(coins);
  };

  const handleRotate = (boardState) => {
    const rotatedShape = rotate90Deg(shape);
    setShape(rotatedShape);
    console.log('Board in handleRotate', boardState);
    const check = validatePlacement(dragCoordinatesRef.current.x, dragCoordinatesRef.current.y, rotatedShape, boardState);
    isValid.current = check;
    console.log(isValid.current);
    console.log(coins);
  };

  const handleFlip = (boardState) => {
    const flippedShape = flipHorizontal(shape);
    setShape(flippedShape);
    const check = validatePlacement(dragCoordinatesRef.current.x, dragCoordinatesRef.current.y, flippedShape, boardState);
    isValid.current = check;
    console.log(isValid.current);
    console.log(coins);
  };

  const handleConfirmPlacement = (x, y, rndShape, boardState) => {
    const collectedCoins = placeTile(x, y, rndShape, boardState);
    setCoins(prevCoins => prevCoins + collectedCoins);
    const newBoardstate = updateBoard(x, y, rndShape, boardState);
    setBoardState(newBoardstate);
    //create a new random shape
    console.log('x and y', x, y);
    const shapeForms = Object.keys(Shapes);
    const newRndShape = Math.floor(Math.random() * shapeForms.length);
    const shapeKey = shapeForms[newRndShape];
    setShape(Shapes[shapeKey]);
    dragCoordinatesRef.current = { x: 1, y: 9 };
    console.log('akuelle Zellen:' , dragCoordinatesRef.current.x, dragCoordinatesRef.current.y);
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
        boardState={boardState}
        setBoardState={setBoardState}
      />
    </div>
  )
}

export default App

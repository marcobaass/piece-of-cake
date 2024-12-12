import { useState, useRef } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';
import { validatePlacement, placeTile, updateBoard } from '../../utils/validatePlacement.js';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig';
import { Shapes } from '../../utils/shapes';
import newShape from '../../utils/newShape.js';
import checkGameEnd from '../../utils/checkGameEnd.js';
import GameEnd from '../GameEnd/GameEnd.jsx';

function App() {
  const [boardCoins] = useState(8);
  const [boardObjects] = useState(12);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(boardCoins + boardObjects - 8 * 8);
  const [cells, setCells] = useState({})
  const [boardState, setBoardState] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const draggingStates = useRef(false);
  const isValid = useRef(false);
  const dragCoordinatesRef = useRef({ x: 1, y: 9 });

  const shapeForms = Object.keys(Shapes);
  const rndShape = Math.floor(Math.random() * shapeForms.length);
  const shapeKey = shapeForms[rndShape];
  const [shape, setShape] = useState(Shapes[shapeKey]);
  const [showRerollPrompt, setShowRerollPrompt] = useState(false);

  const handleStartDragging = () => {
    draggingStates.current = true;
  };

  // Handler for stopping the drag (for a specific shape index)
  const handleStopDragging = (x, y, rndShape, boardState) => {
    draggingStates.current = false;
    const check = validatePlacement(x, y, rndShape, boardState);
    isValid.current = check;
  };

  const handleRotate = (boardState) => {
    const rotatedShape = rotate90Deg(shape);
    setShape(rotatedShape);
    const check = validatePlacement(dragCoordinatesRef.current.x, dragCoordinatesRef.current.y, rotatedShape, boardState);
    isValid.current = check;
  };

  const handleFlip = (boardState) => {
    const flippedShape = flipHorizontal(shape);
    setShape(flippedShape);
    const check = validatePlacement(dragCoordinatesRef.current.x, dragCoordinatesRef.current.y, flippedShape, boardState);
    isValid.current = check;
  };

  const handleConfirmPlacement = (x, y, rndShape, boardState) => {
    const [collectedCoins, collectedPoints] = placeTile(x, y, rndShape, boardState);
    setCoins(prevCoins => prevCoins + collectedCoins);
    setScore(prevScore => prevScore + collectedPoints);
    const newBoardstate = updateBoard(x, y, rndShape, boardState);
    setBoardState(newBoardstate);
    const newRndShape = newShape(Shapes, setShape, dragCoordinatesRef);

    isValid.current = false;

    if (checkGameEnd(newRndShape, newBoardstate)) {

      if (coins === 0) {
        console.log('Spielende')
        setGameEnded(true);
        console.log('set true: ', gameEnded);
      } else {
        setShowRerollPrompt(true);
      }
    } else {
      setShowRerollPrompt(false);
    }
  }

  const handleReroll = () => {
    setCoins(prevCoins => {
      const newCoins = prevCoins -1;
      const newRndShape = newShape(Shapes, setShape, dragCoordinatesRef);
      if (checkGameEnd(newRndShape, boardState)) {
        console.log('Coins left: ', newCoins);
        if (newCoins === 0) {
          console.log('Spielende')
          setGameEnded(true);
          console.log('set true: ', gameEnded);
        } else {
          console.log('Reroll?');
        }
      }
      return newCoins;
    });
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
        handleFlip={handleFlip}
        handleRotate={handleRotate}
        shape={shape} // Pass down shapes state
        isValid={isValid}
        handleConfirmPlacement={handleConfirmPlacement} // Pass down handleConfirmPlacement function
        dragCoordinatesRef={dragCoordinatesRef}
        setCells={setCells} // Pass down setCells function to update the board cells array
        boardState={boardState}
        setBoardState={setBoardState}
        coins={coins}
        handleReroll={handleReroll}
        boardCoins={boardCoins}
        boardObjects={boardObjects}
      />
      {
        showRerollPrompt &&
        <div className={styles.rerollPrompt}>
          <button onClick={GameEnd}>Do you want to End the game?</button>
        </div>
      }
      <GameEnd
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
      />
    </div>
  )
}

export default App

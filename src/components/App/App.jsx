import { useState, useRef, useEffect } from 'react'
import styles from './App.module.css'
import Board from '../Board/Board.jsx';
import PlayerUI from '../PlayerUI/PlayerUI';
import { validatePlacement, placeTile, updateBoard } from '../../utils/validatePlacement.js';
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig';
import { Shapes } from '../../utils/shapes';
import newShape from '../../utils/newShape.js';
import checkGameEnd from '../../utils/checkGameEnd.js';
import GameEnd from '../GameEnd/GameEnd.jsx';
import checkSurround from '../../utils/checkSurround.js';
import { checkFullBoard } from '../../utils/checkFullBoard.js';

function App() {
  const [boardCoins, setBoardCoins] = useState(8);
  const [boardObjects, setBoardObjects] = useState(12);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(boardCoins + boardObjects - 8 * 8);
  const [, setCells] = useState({})
  const [boardState, setBoardState] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [restart, setRestart] = useState(false);
  const [displayedScore, setDisplayedScore] = useState(score)
  const draggingStates = useRef(false);
  const isValid = useRef(false);
  const dragCoordinatesRef = useRef({ x: 1, y: 9 });

  const shapeForms = Object.keys(Shapes);
  const rndShape = Math.floor(Math.random() * shapeForms.length);
  const shapeKey = shapeForms[rndShape];
  const [shape, setShape] = useState(Shapes[shapeKey]);
  const [showRerollPrompt, setShowRerollPrompt] = useState(false);

  const objectsRef = useRef([]);

  const dialogRef = useRef(null);

  const handleStartDragging = () => {
    draggingStates.current = true;
  };

  useEffect(() => {
    // debugger;
    if (displayedScore < score) {
      setTimeout(() => {
        setDisplayedScore(prevDisplayedScore => prevDisplayedScore +1);
      }, 50);
    }
  }, [displayedScore, score])


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
    console.log('collectedPoints: ', collectedPoints, 'collectedCoins: ', collectedCoins);
    setCoins(prevCoins => prevCoins + collectedCoins);
    const scoreBeforeSurround = score + collectedPoints;
    console.log('scoreBeforeSurround: ', scoreBeforeSurround);
    setScore(prevScore => prevScore + collectedPoints);
    const newBoardstate = updateBoard(x, y, rndShape, boardState);
    setBoardState(newBoardstate);
    let newRndShape = newShape(Shapes, setShape, dragCoordinatesRef);

    isValid.current = false;

    newRndShape = checkSurround(newBoardstate, objectsRef, scoreBeforeSurround, setScore, coins, collectedCoins, newRndShape, setShape);

    if (checkGameEnd(newRndShape, newBoardstate)) {
      // check if exact one board left
      const singleBoard = newBoardstate.flat().filter(cell => cell.type === 'board').length;

      if (coins === 0 || checkFullBoard(boardState) || singleBoard === 1) {
        setGameEnded(true);
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
        if (newCoins === 0) {
          setGameEnded(true);
          setShowRerollPrompt(false);
        } else {
          setShowRerollPrompt(true);
        }
      } else {
        setShowRerollPrompt(false);
      }

      return newCoins;
    });
  };

  const handlePlayAgain = () => {
    dialogRef.current.close();
    setGameEnded(false);
    setCoins(0);
    setScore(0);
    setCells({});
    setBoardState([]);
    setBoardState ([]);
    setCells({});
    setBoardCoins(8);
    setBoardObjects(12);
    setRestart(prev => !prev);
    setScore(boardCoins + boardObjects - 8 * 8)
    const newShapeKey = shapeForms[Math.floor(Math.random() * shapeForms.length)];
    setShape(Shapes[newShapeKey]);
    setDisplayedScore(boardCoins + boardObjects - 8 * 8);
  };



  return (
    <div className={styles.app}>
      <h1>piece of cake</h1>
      <PlayerUI
        coins={coins}
        setCoins={setCoins}
        score={displayedScore}
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
        objectsRef={objectsRef}
        showRerollPrompt={showRerollPrompt}
        setGameEnded={setGameEnded}
        restart={restart}
      />
      {/* {
        showRerollPrompt &&
          <button onClick={() => setGameEnded(true)} className={styles.rerollPrompt}>End Game?</button>
      } */}
      {gameEnded && (
        <GameEnd
          gameEnded={gameEnded}
          setGameEnded={setGameEnded}
          coins={coins}
          score={score}
          setScore={setScore}
          boardState={boardState}
          setShape={setShape}
          handlePlayAgain={handlePlayAgain}
          dialogRef={dialogRef}
        />
      )}
    </div>
  )
}

export default App

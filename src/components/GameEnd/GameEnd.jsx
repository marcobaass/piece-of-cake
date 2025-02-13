import PropTypes from 'prop-types';
import { checkFullBoard } from '../../utils/checkFullBoard';
import { useEffect, useRef } from 'react';
import styles from './GameEnd.module.css'

export default function GameEnd({gameEnded, coins, score, boardState, setScore, handlePlayAgain, dialogRef}) {

  console.log('Score und Coins in GameEnd' ,score, coins)

  useEffect(() => {
    if (gameEnded && dialogRef.current) {
      // Zeigt das Dialog-Modal an
      dialogRef.current.showModal();
    }
  }, [gameEnded]);

  useEffect(() => {
    if (checkFullBoard(boardState)) {
      let newScore = score + coins;
      newScore += Math.floor(newScore * 0.1);
      console.log('New Score + 10% in useEffe', newScore);
      setScore(newScore);
    } else {
      let newScore = score + coins;
      setScore(newScore);
    }
  }, []);

  return (
    <>
      {gameEnded && (
        <dialog ref={dialogRef} className={styles.dialogContainer}>
          <h1>GAME OVER</h1>
          <h2>Your Score: {score}</h2>
          <button onClick={handlePlayAgain}>Play Again</button>
        </dialog>
      )}
    </>
  );
}

GameEnd.propTypes = {
  gameEnded: PropTypes.bool.isRequired,
  coins: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  boardState: PropTypes.array.isRequired,
  setGameEnded: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  handlePlayAgain: PropTypes.func.isRequired,
  dialogRef: PropTypes.object.isRequired
}

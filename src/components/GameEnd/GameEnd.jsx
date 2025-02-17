import PropTypes from 'prop-types';
import { checkFullBoard } from '../../utils/checkFullBoard';
import { useEffect } from 'react';
import styles from './GameEnd.module.css'

export default function GameEnd({gameEnded, coins, score, boardState, setScore, handlePlayAgain, dialogRef}) {

  useEffect(() => {
    if (gameEnded && dialogRef.current) {
      // Zeigt das Dialog-Modal an
      dialogRef.current.showModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameEnded]);

  useEffect(() => {
    if (checkFullBoard(boardState)) {
      let newScore = score + coins;
      newScore += Math.floor(newScore * 0.1);
      setScore(newScore);
    } else {
      let newScore = score + coins;
      setScore(newScore);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {gameEnded && (
        <dialog ref={dialogRef} className={styles.dialogContainer}>
          <h1>GAME OVER</h1>
          <h2>You scored {score} 🍪</h2>
          <button onClick={handlePlayAgain} className={styles.restartBtn}>Play Again 🎈</button>
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

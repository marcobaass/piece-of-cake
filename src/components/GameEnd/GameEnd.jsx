import PropTypes from 'prop-types';
import { checkFullBoard } from '../../utils/checkFullBoard';
import { useEffect } from 'react';

export default function GameEnd({gameEnded, coins, score, boardState, setScore}) {

  console.log('Score und Coins in GameEnd' ,score, coins)



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
        <>
          <h1>GAME OVER</h1>
          <h2>Your Score: {score}</h2>
        </>
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
}

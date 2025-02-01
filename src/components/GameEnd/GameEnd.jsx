import PropTypes from 'prop-types';

export default function GameEnd({gameEnded, coins, score}) {
  // console.log(gameEnded);
  const newScore = score + coins;
  return (
    <>
      {gameEnded && (
        <>
          <h1>GAME OVER</h1>
          <h2>Your Score: {newScore}</h2>
        </>
      )}
    </>
  );
}

GameEnd.propTypes = {
  gameEnded: PropTypes.bool.isRequired,
  coins: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
}

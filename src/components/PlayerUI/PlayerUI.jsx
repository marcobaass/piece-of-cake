import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'


export default function PlayerUI({
  coins,
  score
}) {

  return (
    <div>
      <div className={styles.playerData}>
        <h2>🧁: {coins}</h2>
        <h2>🍪: {score}</h2>
      </div>

    </div>
  );
}

PlayerUI.propTypes = {
  coins: PropTypes.number.isRequired,
  setCoins: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired
}

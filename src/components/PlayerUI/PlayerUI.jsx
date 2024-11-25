import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'


export default function PlayerUI({
  coins,
  score
}) {

  return (
    <div>
      <div className={styles.playerData}>
        <h1>💰: {coins}</h1>
        <h1>🏆: {score}</h1>
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

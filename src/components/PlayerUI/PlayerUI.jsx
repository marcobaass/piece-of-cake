import ShapeSelection from '../ShapeSelection/ShapeSelection'
import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'

export default function PlayerUI({coins, score, handleStartDragging, handleStopDragging
}) {

  return (
    <div>
      <div className={styles.playerData}>
        <h1>💰: {coins}</h1>
        <h1>🏆: {score}</h1>
      </div>
      <div className={styles.shapeSelection}>
        <ShapeSelection
          index={0} // Pass index to identify the shape
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          index={1}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          index={2}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />
      </div>
    </div>
  );
}

PlayerUI.propTypes = {
  coins: PropTypes.number.isRequired,
  setCoins: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  draggingStates: PropTypes.object.isRequired,
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired
}

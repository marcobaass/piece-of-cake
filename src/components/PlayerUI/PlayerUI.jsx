import ShapeSelection from '../ShapeSelection/ShapeSelection'
import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'

export default function PlayerUI({
  coins, setCoins, score, setScore, draggingStates, handleStartDragging, handleStopDragging
}) {
  console.log(draggingStates);
  
  return (
    <div>
      <div className={styles.playerData}>
        <h1>💰: {coins}</h1>
        <h1>🏆: {score}</h1>
      </div>
      <div className={styles.shapeSelection}>
      <ShapeSelection
          index={0} // Pass index to identify the shape
          draggingState={draggingStates.current[0]} // Pass current dragging state from useRef
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
          shadowClass={draggingStates.current[0] ? styles.shadow : ''}
        />
        <ShapeSelection
          index={1}
          draggingState={draggingStates.current[1]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
          shadowClass={draggingStates.current[1] ? styles.shadow : ''}
        />
        <ShapeSelection
          index={2}
          draggingState={draggingStates.current[2]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
          shadowClass={draggingStates.current[2] ? styles.shadow : ''}
        />
      </div>
    </div>
  );
}

PlayerUI.propsType = {
  coins: PropTypes.number.isRequired,
  setCoins: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  draggingStates: PropTypes.array.isRequired,
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired
}

import ShapeSelection from '../ShapeSelection/ShapeSelection'
import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig'
import { useState } from 'react';
import { Shapes } from '../../utils/shapes';

export default function PlayerUI({coins, score, handleStartDragging, handleStopDragging
}) {

  const shapeKeys = Object.keys(Shapes);
  const [rndShape, setRndShape] = useState(Shapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]]);

  const handleRotate = () => {
    setRndShape(rotate90Deg(rndShape));
  }

  const handleFlip = () => {
    setRndShape(flipHorizontal(rndShape));
  }

  return (
    <div>
      <div className={styles.playerData}>
        <h1>💰: {coins}</h1>
        <h1>🏆: {score}</h1>
      </div>

      <div className={styles.shapeButtons}>
        <button onClick={handleRotate}>Rotate</button>
        <button onClick={handleFlip}>Flip</button>
      </div>

      <div className={styles.shapeSelection}>
        <ShapeSelection
          index={0} // Pass index to identify the shape
          shape={rndShape}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          index={1}
          shape={rndShape}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          index={2}
          shape={rndShape}
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

import ShapeSelection from '../ShapeSelection/ShapeSelection'
import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'
import { rotate90Deg, flipHorizontal } from '../../utils/shapeConfig'
import { useState } from 'react';
import { Shapes } from '../../utils/shapes';

export default function PlayerUI({
  coins,
  score,
  handleStartDragging,
  handleStopDragging
}) {
  console.log(Shapes)

  const shapeForms = Object.keys(Shapes);

  console.log('Shape Letters', shapeForms);


  const shuffledShapes = (shapeForms) => {
    let oldElement;
    for (let i= shapeForms.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = shapeForms[i];
      shapeForms[i] = shapeForms[rand];
      shapeForms[rand] = oldElement;
    }
    return shapeForms;
  }

  const shuffledArray = shuffledShapes([...shapeForms]);


  const [shapes, setShapes] = useState([
    Shapes[shuffledArray[0]],
    Shapes[shuffledArray[1]],
    Shapes[shuffledArray[2]]
  ]);

  const handleRotate = () => {
    const newShapes = shapes.map(shape => rotate90Deg(shape));
    setShapes(newShapes);
  };

  const handleFlip = () => {
    const newShapes = shapes.map(shape => flipHorizontal(shape));
    setShapes(newShapes);
  };


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
          rndShape={shapes[0]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          rndShape={shapes[1]}
          handleStartDragging={handleStartDragging}
          handleStopDragging={handleStopDragging}
        />

        <ShapeSelection
          rndShape={shapes[2]}
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

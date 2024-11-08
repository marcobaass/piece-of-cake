import { Shapes } from '../../utils/shapes';
import Draggable from 'react-draggable';
import styles from './ShapeSelection.module.css';
import PropTypes from 'prop-types';

export default function ShapeSelection({
  handleStartDragging,
  handleStopDragging,
  draggingState,
  shadowClass,
  index
}) {
  const shapeKeys = Object.keys(Shapes);
  const rndShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
  const rndShape = Shapes[rndShapeKey];

  return (
    <Draggable
      onStart={() => handleStartDragging(index)} // Start dragging handler
      onStop={() => handleStopDragging(index)} // Stop dragging handler
    >
      <div className={shadowClass}>
       {console.log(shadowClass)}
        {rndShape.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <span key={colIndex}>
                {cell === 1 ? <div className={styles.filled}></div> : <div className={styles.empty}></div>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Draggable>
  );
}

ShapeSelection.propTypes = {
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired,
  draggingState: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  shadowClass: PropTypes.string.isRequired
}

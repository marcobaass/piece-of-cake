import { Shapes } from '../../utils/shapes';
import Draggable from 'react-draggable';
import styles from './ShapeSelection.module.css';
import PropTypes from 'prop-types';
import React from'react';

export default function ShapeSelection({
  handleStartDragging,
  handleStopDragging,
  index
}) {
  const nodeRef = React.useRef(null);

  const shapeKeys = Object.keys(Shapes);
  const rndShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
  const rndShape = Shapes[rndShapeKey];

  const cellSize = () => {
    const cellSizeStr = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').trim();
    return parseInt(cellSizeStr, 10);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      grid={[cellSize(), cellSize()]}
      onStart={() => handleStartDragging(index)} // Start dragging handler
      onStop={() => handleStopDragging(index)} // Stop dragging handler
    >
      <div ref={nodeRef}>
        {rndShape.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <span key={colIndex}>
                {cell === 1 ? <div className={`${styles.filled} ${styles.filledShadow}`}></div> : <div className={styles.empty}></div>}
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
  index: PropTypes.number.isRequired
}

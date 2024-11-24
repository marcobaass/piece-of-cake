import Draggable from 'react-draggable';
import styles from './ShapeSelection.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function ShapeSelection({
  handleStartDragging,
  handleStopDragging,
  rndShape,
  setCellX,
  setCellY,
  boardState
}) {


  const nodeRef = React.useRef(null);

  const cellSize = () => {
    const cellSizeStr = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').trim();
    return parseInt(cellSizeStr, 10);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      grid={[cellSize(), cellSize()]}
      bounds="section"
      defaultPosition={{x: cellSize(), y: cellSize()*9}}
      // onDrag={(e, data) => {
      //   const x = Math.floor(data.x / cellSize());
      //   const y = Math.floor(data.y / cellSize());
      //   console.log(`Grid Position: x=${x}, y=${y}`); // Directly log the calculated grid position
      // }}

      onStart={() => {
        handleStartDragging();
        nodeRef.current.querySelectorAll(`.${styles.filled}`).forEach(cell => {
          cell.classList.add(styles.filledShadow);
        });
      }}

      onStop={(e, data) => {
        const x = Math.floor(data.x / cellSize());
        const y = Math.floor(data.y / cellSize());
        console.log(`Final Grid Position: x=${x}, y=${y}`);
        setCellX(x); // Update state only on stop
        setCellY(y);
        console.log('Shape Array:', rndShape)
        handleStopDragging(x, y, rndShape, boardState);
        nodeRef.current.querySelectorAll(`.${styles.filled}`).forEach(cell => {
          cell.classList.remove(styles.filledShadow);
        });
      }}
    >
      <div ref={nodeRef}>
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
  rndShape: PropTypes.array.isRequired,
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  cellX: PropTypes.number,
  setCellX: PropTypes.func,
  cellY: PropTypes.number,
  setCellY: PropTypes.func,
  boardState: PropTypes.array.isRequired
}

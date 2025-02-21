import Draggable from 'react-draggable';
import styles from './ShapeSelection.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function ShapeSelection({
  handleStartDragging,
  handleStopDragging,
  shapeGrid,
  boardState,
  isValid,
  handleConfirmPlacement,
  dragCoordinatesRef,
  setCells
}) {


  const nodeRef = React.useRef(null);

  const cellSize = () => {
    const cellSizeStr = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').trim();
    console.log(cellSizeStr);
    return parseInt(cellSizeStr, 10);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      grid={[cellSize(), cellSize()]}
      bounds="section"
      cancel=".confirmBtn"
      // defaultPosition={{x: cellSize(), y: cellSize()*9}}
      position={{
        x: dragCoordinatesRef.current.x * cellSize(),
        y: dragCoordinatesRef.current.y * cellSize(),
      }}

      onStart={() => {
        handleStartDragging();
        nodeRef.current.querySelectorAll(`.${styles.filled}`).forEach(cell => {
          cell.classList.add(styles.filledShadow);
        });
      }}

      onStop={(e, data) => {
        const x = Math.floor(data.x / cellSize());
        const y = Math.floor(data.y / cellSize());
        dragCoordinatesRef.current = { x, y };
        setCells({x, y});
        handleStopDragging(x, y, shapeGrid, boardState);
        nodeRef.current.querySelectorAll(`.${styles.filled}`).forEach(cell => {
          cell.classList.remove(styles.filledShadow);
        });
      }}
    >
      <div ref={nodeRef}>
        <div>
          {shapeGrid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((cell, colIndex) => (
                <span key={colIndex}>
                  {cell === 1 ? <div className={styles.filled}></div> : <div className={styles.empty}></div>}
                </span>
              ))}
            </div>
          ))}
        </div>

        <button className={`${styles.placeBtn} confirmBtn`}>
          { isValid.current ? (
            <span
              className={styles.valid}
              onClick={() => handleConfirmPlacement(
                dragCoordinatesRef.current.x,
                dragCoordinatesRef.current.y,
                shapeGrid,
                boardState
              )}>
              ✔
            </span>
          ) : (
            <span className={styles.invalid}>❌</span>
          )}
        </button>

      </div>
    </Draggable>
  );
}

ShapeSelection.propTypes = {
  shapeGrid: PropTypes.array.isRequired, // Renamed from rndShape
  handleStartDragging: PropTypes.func.isRequired,
  handleStopDragging: PropTypes.func.isRequired,
  boardState: PropTypes.array.isRequired,
  isValid: PropTypes.object.isRequired,
  handleConfirmPlacement: PropTypes.func.isRequired,
  dragCoordinatesRef: PropTypes.object.isRequired,
  setCells: PropTypes.func.isRequired
}

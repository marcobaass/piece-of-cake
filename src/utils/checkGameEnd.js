import { flipHorizontal, rotate90Deg } from "./shapeConfig";

export default function checkGameEnd(rndShape, boardState) {
  // all possible states of the shape (3x rotated, than flip, than 3x rotate (8 states))
  function getAllTransformations (shape) {
    const transformations = [];
    let currentShape = shape;

    for (let i = 0; i < 4; i++) {
      if (!transformations.some(t => JSON.stringify(t) === JSON.stringify(currentShape))) {
        transformations.push(currentShape);
      }

      if (!transformations.some(t => JSON.stringify(t) === JSON.stringify(flipHorizontal(currentShape)))) {
        transformations.push(flipHorizontal(currentShape));
      }
      currentShape = rotate90Deg(currentShape);
    }
    return transformations;
  }

  const transformations = getAllTransformations(rndShape);


  for (let boardY = 0; boardY < boardState.length; boardY++) {
    for (let boardX = 0; boardX < boardState.length[0]; boardX++) {
      const cell = boardState[boardY][boardX];

      if (cell.type === 'board' || cell.type === 'coin') {
        for (const transformedShape of transformations) {
          if (canPlace(transformedShape,boardState, boardY, boardX)) {
            return false;
          }
        }
      }
    }
  }

  function canPlace(shape, boardState, boardY, boardX) {
      const boardHeight = boardState.length;
      const boardWidth = boardState[0].length;

    for (let shapeY = 0; shapeY < shape.length; shapeY++) {
      for (let shapeX = 0; shapeX < shape[0].length; shapeX++) {

        const targetY = shapeY + boardY;
        const targetX = shapeX + boardX;

        if (
          targetY >= boardHeight ||
          targetY < 0 ||
          targetX >= boardWidth ||
          targetX < 0) {
          return false;
        }

        const cell = boardState[targetY][targetX];

        if (cell.type !== 'board' && cell.type !== 'coin') {
          return false;
        }
      }
    }
    return true;
  }
  return true;
}

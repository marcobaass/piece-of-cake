import { flipHorizontal, rotate90Deg } from "./shapeConfig";

export default function checkGameEnd(rndShape, boardState) {
  // all possible states of the shape (3x rotated, than flip, than 3x rotate (8 states))
  function getAllTransformations (shape) {
    const transformations = new Set();
    let currentShape = shape;

    for (let i = 0; i < 4; i++) {
      const original = JSON.stringify(currentShape);
      transformations.add(original);

      let newCurrentShape = currentShape.map(row => [...row]);
      const flipped = JSON.stringify(flipHorizontal(newCurrentShape));
      transformations.add(flipped);

      currentShape = rotate90Deg(currentShape);
    }
    return Array.from(transformations).map(shapeStr => JSON.parse(shapeStr));
  }

  const transformations = getAllTransformations(rndShape);

  for (let boardY = 0; boardY < boardState.length; boardY++) {

    for (let boardX = 0; boardX < boardState[0].length; boardX++) {
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
    // debugger;
    const boardHeight = boardState.length;
    const boardWidth = boardState[0].length;
    for (let shapeY = 0; shapeY < shape.length; shapeY++) {
      for (let shapeX = 0; shapeX < shape[0].length; shapeX++) {

        if (shape[shapeY][shapeX] === 1) {
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
    }
    return true;
  }

  return true;
}

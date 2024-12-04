export function validatePlacement(colShape, rowShape, shapeGrid, boardState) {

  let check = true;

  shapeGrid.forEach(row => {
    row.forEach(cell => {
      let cellType = boardState[rowShape][colShape].type;
      if (cell === 1 && (cellType !== 'coin' && cellType !== 'board') ) {
        check = false;
      }
      if (cell === 1 & cellType === 'object') {
        check = false;
      }
      if (cell === 1 & cellType === 'cake') {
        check = false;
      }
      colShape++;
    });
    rowShape ++;
    colShape = colShape - shapeGrid[0].length;
  });

  return check;
}



export function placeTile(colShape, rowShape, shapeGrid, boardState) {
  let collectedCoins = 0;
  let collectedPoints = 0;

  shapeGrid.forEach(row => {
    row.forEach(cell => {
      let cellType = boardState[rowShape][colShape].type;

      if (cell === 1 & cellType === 'coin') {
        collectedCoins ++;
      }

      if (cell === 1 & cellType === 'board') {
        collectedPoints ++;
      }

      colShape++;
    });
    rowShape ++;
    colShape = colShape - shapeGrid[0].length;
  });

  return [collectedCoins, collectedPoints];
}



export function updateBoard(colShape, rowShape, shapeGrid, boardState) {
  shapeGrid.forEach(row => {
    row.forEach(cell => {

      if (cell === 1) {
        boardState[rowShape][colShape].type = 'cake';
      }
      colShape++;
    });
    rowShape ++;
    colShape = colShape - shapeGrid[0].length;
  });

  return boardState;
}

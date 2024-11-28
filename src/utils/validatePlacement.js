export function validatePlacement(colShape, rowShape, shapeGrid, boardState) {

  let check = true;

  shapeGrid.forEach(row => {
    row.forEach(cell => {
      console.log('RowShape:', rowShape, 'ColShape:', colShape, 'Board State:', boardState);
      let cellType = boardState[rowShape][colShape].type;
      console.log('#', cellType, rowShape, colShape);
      if (cell === 1 && (cellType !== 'coin' && cellType !== 'board') ) {
        check = false;
      }
      if (cell === 1 & cellType === 'object') {
        console.log('Object hit');
        check = false;
      }
      if (cell === 1 & cellType === 'cake') {
        console.log('There is already cake');
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

  shapeGrid.forEach(row => {
    row.forEach(cell => {
      console.log('RowShape:', rowShape, 'ColShape:', colShape, 'Board State:', boardState);
      let cellType = boardState[rowShape][colShape].type;
      console.log('#', cellType, rowShape, colShape);

      if (cell === 1 & cellType === 'coin') {
        console.log('Coin found')
        collectedCoins ++;
      }
      colShape++;
    });
    rowShape ++;
    colShape = colShape - shapeGrid[0].length;
  });

  return collectedCoins;
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

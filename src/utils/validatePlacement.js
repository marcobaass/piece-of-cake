export function validatePlacement(colShape, rowShape, shapeGrid, boardState) {

  let check = true;
  let collectedCoins = 0;

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
      if (cell === 1 & cellType === 'coin') {
        console.log('Coin found')
        collectedCoins ++;
      }
      colShape++;
    });
    rowShape ++;
    colShape = colShape - shapeGrid[0].length;
  });

  return { check, collectedCoins };


    // Checkmark Button anzeigen
      // if button bestätigt >>> updateBoard() Funktion um cellTypes, Coins, Points etc. upzudaten
      // zurück zu neuem random shape
}

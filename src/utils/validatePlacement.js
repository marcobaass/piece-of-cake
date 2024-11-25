export function validatePlacement(colShape, rowShape, shapeGrid, boardState) {
  console.log('Zellen:', rowShape, colShape)
  console.log('Tetristeil:', shapeGrid)
  console.log('Board:', boardState);
  

  shapeGrid.forEach(row => {
    row.forEach(cell => {
      let cellType = boardState[rowShape][colShape].type;
      console.log('#', cellType, rowShape, colShape);
      if (cell === 1 & cellType === 'object') {
        console.log('Object hit')
      }
      if (cell === 1 & cellType === 'cake') {
        console.log('There is already cake')
      }
      if (cell === 1 & cellType === 'coin') {
        console.log('Coin found')
      }
      colShape++;
    });
    rowShape ++;
    colShape = colShape - shapeGrid[0].length;
  });

  // mit forEach durch shapeGrid iterrieren
  // check ob cellType === Object >>> Tetristeil zurück auf Start
  // check ob cellType === cake >>> Tetristeil zurück auf Start
    // check ob cellType === Coin >>> coinswert erhöhen (temporär wegen bestätigen?)
    // Checkmark Button anzeigen
      // if button bestätigt >>> updateBoard() Funktion um cellTypes, Coins, Points etc. upzudaten
      // zurück zu neuem random shape
}

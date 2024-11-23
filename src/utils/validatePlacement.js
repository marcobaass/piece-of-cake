export function validatePlacement(colShape, rowShape, rndShape, boardState) {
  console.log('Zellen:', rowShape, colShape)
  console.log('Tetristeil:', rndShape)
  const cellType = boardState[rowShape][colShape].type;
  console.log(cellType);

  // mit forEach durch rndShape iterrieren
    // check ob cellType === Object >>> Tetristeil zurück auf Start
    // check ob cellType === cake >>> Tetristeil zurück auf Start
    // check ob cellType === Coin >>> coinswert erhöhen (temporär wegen bestätigen?)
    // Checkmark Button anzeigen
      // if button bestätigt >>> updateBoard() Funktion um cellTypes, Coins, Points etc. upzudaten
      // zurück zu neuem random shape
}

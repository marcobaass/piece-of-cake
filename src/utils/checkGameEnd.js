import { flipHorizontal, rotate90Deg } from "./shapeConfig";

export default function checkGameEnd(rndShape, boardState) {
  // Funktion, die alle möglichen Transformationen einer Form generiert
  function getAllTransformations (shape) {
    const transformations = new Set(); // Set speichert eindeutige Transformationen
    let currentShape = shape;

    for (let i = 0; i < 4; i++) { // 4 Rotationen durchführen (0°, 90°, 180°, 270°)
      const original = JSON.stringify(currentShape);
      transformations.add(original); // Aktuelle Form als String speichern

      let newCurrentShape = currentShape.map(row => [...row]); // Tiefe Kopie der Form erstellen
      const flipped = JSON.stringify(flipHorizontal(newCurrentShape)); // Form horizontal spiegeln
      transformations.add(flipped); // Gespiegelte Form speichern

      currentShape = rotate90Deg(currentShape); // Form um 90° drehen
    }
    // Konvertiere die Strings zurück in Arrays und gebe alle Transformationen zurück
    return Array.from(transformations).map(shapeStr => JSON.parse(shapeStr));
  }

  // Alle möglichen Transformationen der Form abrufen
  const transformations = getAllTransformations(rndShape);

  // Spielfeld durchsuchen, um zu prüfen, ob eine Platzierung noch möglich ist
  for (let boardY = 0; boardY < boardState.length; boardY++) {
    for (let boardX = 0; boardX < boardState[0].length; boardX++) {
      const cell = boardState[boardY][boardX];

      // Prüfen, ob das aktuelle Feld eine gültige Platzierung erlaubt
      if (cell.type === 'board' || cell.type === 'coin') {
        for (const transformedShape of transformations) { // Alle Transformationen durchgehen
          if (canPlace(transformedShape,boardState, boardY, boardX)) {
            return false; // Falls eine Platzierung möglich ist, Spiel ist NICHT zu Ende
          }
        }
      }
    }
  }

  // function to check if shape still fits within board
  function canPlace(shape, boardState, boardY, boardX) {
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
    // no placement possible
    return true;
  }

  // no placement possible
  return true;
}

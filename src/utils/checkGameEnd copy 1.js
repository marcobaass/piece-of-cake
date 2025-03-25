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

  // Berechnet die Bounding Box der Form (min und max Index der belegten Zellen)
  function getBoundingBox(shape) {
    let minY = shape.length, maxY = -1, minX = shape[0].length, maxX = -1;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
        }
      }
    }
    return { minY, maxY, minX, maxX };
  }

  // Schneidet die Form auf den relevanten Bereich (ohne leere Ränder) zu
  function trimShape(shape) {
    const { minY, maxY, minX, maxX } = getBoundingBox(shape);
    const trimmed = [];
    for (let y = minY; y <= maxY; y++) {
      // Kopiere den relevanten Teil der Zeile
      trimmed.push(shape[y].slice(minX, maxX + 1));
    }
    return trimmed;
  }

  // Kann-Funktion, die die getrimmte Form verwendet und den Ankerpunkt oben links setzt
  function canPlace(shape, boardState, boardY, boardX) {
    const trimmed = trimShape(shape);
    const boardHeight = boardState.length;
    const boardWidth = boardState[0].length;

    for (let y = 0; y < trimmed.length; y++) {
      for (let x = 0; x < trimmed[0].length; x++) {
        if (trimmed[y][x] === 1) {
          const targetY = boardY + y;
          const targetX = boardX + x;

          if (
            targetY < 0 ||
            targetY >= boardHeight ||
            targetX < 0 ||
            targetX >= boardWidth
          ) {
            console.log(`Außerhalb: trimmed[${y}][${x}] bei board(${targetY},${targetX})`);
            return false;
          }
          const cell = boardState[targetY][targetX];
          if (cell.type !== 'board' && cell.type !== 'coin') {
            console.log(`Ungültiger Zelltyp an (${targetY},${targetX}): ${cell.type}`);
            return false;
          }
        }
      }
    }
    return true;
  }

  // no placement possible
  return true;
}

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

  /**
 * Prüft, ob sich das gegebene Shape (2D-Array) so auf dem Board platzieren lässt,
 * dass alle aktiven Zellen (1en) auf Zellen mit Typ 'board' oder 'coin' landen.
 * Dabei wird jedes aktive Feld im Shape als möglicher Anker verwendet.
 */
  function canPlace(shape, boardState, boardY, boardX) {
    const boardHeight = boardState.length;
    const boardWidth = boardState[0].length;

    // Iteriere über alle Zellen des Shapes, die aktiv sind (Wert 1)
    for (let anchorY = 0; anchorY < shape.length; anchorY++) {
      for (let anchorX = 0; anchorX < shape[0].length; anchorX++) {
        if (shape[anchorY][anchorX] === 1) {
          // Berechne den Offset, damit diese aktive Zelle an boardY, boardX landet
          const offsetY = boardY - anchorY;
          const offsetX = boardX - anchorX;
          let passt = true;

          // Prüfe alle aktiven Zellen des Shapes mit diesem Offset
          for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[0].length; x++) {
              if (shape[y][x] === 1) {
                const targetY = offsetY + y;
                const targetX = offsetX + x;

                // Ist die Zelle außerhalb des Boards?
                if (
                  targetY < 0 ||
                  targetY >= boardHeight ||
                  targetX < 0 ||
                  targetX >= boardWidth
                ) {
                  passt = false;
                  break;
                }

                // Ist der Zelltyp nicht zulässig?
                const cell = boardState[targetY][targetX];
                if (cell.type !== 'board' && cell.type !== 'coin') {
                  passt = false;
                  break;
                }
              }
            }
            if (!passt) break;
          }

          if (passt) return true; // Für diesen Anker gibt es eine gültige Platzierung
        }
      }
    }

    return false; // Keine Verschiebung führt zu einer gültigen Platzierung
  }

  // no placement possible
  return true;
}

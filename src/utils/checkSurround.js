export default function checkSurround(newBoardState, objectsRef) {
  const flatBoardState = newBoardState.flat();

  for (const object of objectsRef.current) {
    const [rowPart, colPart] = object.id.split('-');
    // Zahlen extrahieren
    const row = parseInt(rowPart.slice(1));
    const col = parseInt(colPart.slice(1));

    // Alle 8 Nachbar-IDs in einem Array speichern
    const neighborIds = [
      `r${row + 1}-c${col}`,
      `r${row - 1}-c${col}`,
      `r${row}-c${col + 1}`,
      `r${row}-c${col - 1}`,
      `r${row + 1}-c${col + 1}`,
      `r${row + 1}-c${col - 1}`,
      `r${row - 1}-c${col - 1}`,
      `r${row - 1}-c${col + 1}`,
    ];

    // Überprüfen, ob ein Nachbar noch 'coin' oder 'board' ist
    const notSurrounded = neighborIds.some((neighborId) => {
      const neighborCell = flatBoardState.find(cell => cell.id === neighborId);
      return neighborCell && (neighborCell.type === 'coin' || neighborCell.type === 'board');
    });

    if (!notSurrounded) {
      console.log(`✅ Object at ${object.id} is completely surrounded.`);
      // object aus dem useref entfernen
      // evtl auf length checken? um zu sehen ob alles umrandet wurde?
      // score die anzahl coins hinzufügen
      // zur logik gehen, die ein single piece platzieren lässt
      // was passiert wenn ich zwei oder mehr objekte auf einmal umrande?
      // object.remove();
      // add score for each coin
      // console.log(score);
      // score += coins;
      // setScore(score);
    } else {
      console.log(`❌ Object at ${object.id} is NOT completely surrounded.`);
      // es passiert nichts weiter und das spiel geht normal weiter
    }
  }
}

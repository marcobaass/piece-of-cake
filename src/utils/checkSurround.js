export default function checkSurround(newBoardState, objectsRef, scoreBeforeSurround, setScore, coins) {
  const flatBoardState = newBoardState.flat();
  const objectsToRemove = [];
  const updateScore = (coinsToAdd) => {
    console.log('coins to add', coinsToAdd);
    console.log('prevScore', scoreBeforeSurround);
    console.log('updated score', scoreBeforeSurround+coinsToAdd);
    const newScore = scoreBeforeSurround+coinsToAdd;
    setScore(newScore);
  }

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
      objectsToRemove.push(object.id);
      // zur logik gehen, die ein single piece platzieren lässt
    } else {
      console.log(`❌ Object at ${object.id} is NOT completely surrounded.`);
      // es passiert nichts weiter und das spiel geht normal weiter
    }

    if (objectsToRemove.length > 0) {
      objectsRef.current = objectsRef.current.filter(obj => !objectsToRemove.includes(obj.id));
      console.log(`Entfernte Objekte: ${objectsToRemove.join(', ')}`);
      console.log('Aktueller Stand von objectsRef:', objectsRef.current);

      const coinsToAdd = objectsToRemove.length * coins;
      updateScore(coinsToAdd);
    }

  }

}

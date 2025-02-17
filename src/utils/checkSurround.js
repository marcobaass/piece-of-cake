export default function checkSurround(newBoardState, objectsRef, scoreBeforeSurround, setScore, coins, collectedCoins, newRndShape, setShape) {
  const flatBoardState = newBoardState.flat();
  const objectsToRemove = [];
  // const updateScore = (coinsToAdd, newRndShape, setShape) => {
  //   const newScore = scoreBeforeSurround+coinsToAdd;
  //   setScore(newScore);
  //   setShape([[1]]);
  // }

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
      objectsToRemove.push(object.id);
    }
  }

  if (objectsToRemove.length > 0) {
    objectsToRemove.forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        const imgElement = container.querySelector('img');
        if (imgElement) {
          imgElement.classList.add('animate-surrounded');
          setTimeout(() => {
            imgElement.classList.remove('animate-surrounded');
          }, 500);
        }
      }
    });

    objectsRef.current = objectsRef.current.filter(obj => !objectsToRemove.includes(obj.id));

    const coinsToAdd = objectsToRemove.length * (coins + collectedCoins);
    console.log('checkSurround - 56 // coinsToAdd: ' + coinsToAdd)
    // updateScore(coinsToAdd, newRndShape, setShape);
    setScore(prev => prev + coinsToAdd);
    setShape([[1]]);
    return [[1]];
  }
  return newRndShape;
}

export function checkFullBoard(boardState) {
  if (!boardState || boardState.length === 0) return false;
  return !boardState.some(row => row.some(cell => cell.type === 'board'));
}

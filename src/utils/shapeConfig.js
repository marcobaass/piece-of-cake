// Rotate a 2D array 90 degrees clockwise
export function rotate90Deg(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = [];

  for (let i = 0; i < cols; i++) {
    rotated[i] = [];
    for (let j = rows - 1; j >= 0; j--) {
      rotated[i].push(matrix[j][i]);
    }
  }

  return rotated;
}

// Flip a 2D array horizontally (reverse each row)
export function flipHorizontal(matrix) {
  return matrix.map(row => row.reverse());
}

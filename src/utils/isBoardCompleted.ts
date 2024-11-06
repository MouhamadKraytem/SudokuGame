export const isBoardComplete = (board: number[][]): boolean => {
  // Helper function to check if an array contains all unique numbers from 1 to 9
  const isUniqueSet = (arr: number[]): boolean => {
    const seen = new Set<number>();
    for (let num of arr) {
      if (num < 1 || num > 9 || seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
    return true;
  };

  // Check rows
  for (let row = 0; row < 9; row++) {
    if (!isUniqueSet(board[row])) {
      return false;
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const column = board.map(row => row[col]);
    if (!isUniqueSet(column)) {
      return false;
    }
  }

  // Check 3x3 grids
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const grid = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          grid.push(board[boxRow * 3 + row][boxCol * 3 + col]);
        }
      }
      if (!isUniqueSet(grid)) {
        return false;
      }
    }
  }

  // If all checks pass, the board is complete
  return true;
};

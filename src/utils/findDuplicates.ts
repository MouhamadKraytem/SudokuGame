export const  findDuplicates = (board: number[][]): { [key: string]: boolean } => {
    const duplicates: { [key: string]: boolean } = {};

    // Check each row for duplicates
    for (let row = 0; row < 9; row++) {
      const seen = new Map<number, number[]>(); // Map number to an array of column indices where it appears
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num !== 0) {
          if (!seen.has(num)) {
            seen.set(num, [col]);
          } else {
            seen.get(num)?.push(col); // Add column index to the list for this number
          }
        }
      }
      // Mark all duplicates in this row
      seen.forEach((cols, num) => {
        if (cols.length > 1) {
          cols.forEach((col) => {
            duplicates[`${row}-${col}`] = true;
          });
        }
      });
    }

    // Check each column for duplicates
    for (let col = 0; col < 9; col++) {
      const seen = new Map<number, number[]>(); // Map number to an array of row indices where it appears
      for (let row = 0; row < 9; row++) {
        const num = board[row][col];
        if (num !== 0) {
          if (!seen.has(num)) {
            seen.set(num, [row]);
          } else {
            seen.get(num)?.push(row); // Add row index to the list for this number
          }
        }
      }
      // Mark all duplicates in this column
      seen.forEach((rows, num) => {
        if (rows.length > 1) {
          rows.forEach((row) => {
            duplicates[`${row}-${col}`] = true;
          });
        }
      });
    }

    // Check each 3x3 grid for duplicates
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const seen = new Map<number, [number, number][]>(); // Map number to an array of (row, col) pairs
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const currRow = boxRow * 3 + row;
            const currCol = boxCol * 3 + col;
            const num = board[currRow][currCol];
            if (num !== 0) {
              if (!seen.has(num)) {
                seen.set(num, [[currRow, currCol]]);
              } else {
                seen.get(num)?.push([currRow, currCol]); // Add (row, col) pair for this number
              }
            }
          }
        }
        // Mark all duplicates in this grid
        seen.forEach((positions, num) => {
          if (positions.length > 1) {
            positions.forEach(([row, col]) => {
              duplicates[`${row}-${col}`] = true;
            });
          }
        });
      }
    }

    return duplicates;
  };
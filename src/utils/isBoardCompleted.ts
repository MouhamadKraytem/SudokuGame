

export const isBoardComplete = (
	board: { value: number; isEditable: boolean }[][]
): boolean => {
	// Helper function to check if an array contains all numbers from 1 to 9 (excluding empty cells)
	const isUniqueSet = (arr: { value: number }[]): boolean => {
		const seen = new Set<number>();
		for (let cell of arr) {
			if (cell.value < 1 || cell.value > 9 || seen.has(cell.value)) {
				return false; // Invalid or duplicate value
			}
			seen.add(cell.value);
		}
		return true;
	};

	// Check rows for completeness and empty cells
	for (let row = 0; row < 9; row++) {
		const rowValues = board[row].filter((cell) => cell.value !== 0); // Exclude empty cells
		if (rowValues.length !== 9) {
			return false; // Row has empty cells
		}
		if (!isUniqueSet(rowValues)) {
			return false; // Duplicates found
		}
	}

	// Check columns for completeness and empty cells
	for (let col = 0; col < 9; col++) {
		const columnValues = board
			.map((row) => row[col])
			.filter((cell) => cell.value !== 0); // Exclude empty cells
		if (columnValues.length !== 9) {
			return false; // Column has empty cells
		}
		if (!isUniqueSet(columnValues)) {
			return false; // Duplicates found
		}
	}

	// Check 3x3 grids for completeness and empty cells
	for (let boxRow = 0; boxRow < 3; boxRow++) {
		for (let boxCol = 0; boxCol < 3; boxCol++) {
			const grid: { value: number }[] = [];
			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 3; col++) {
					const cell = board[boxRow * 3 + row][boxCol * 3 + col];
					if (cell.value !== 0) {
						grid.push(cell); // Exclude empty cells
					}
				}
			}
			if (grid.length !== 9) {
				return false; // Grid has empty cells
			}
			if (!isUniqueSet(grid)) {
				return false; // Duplicates found
			}
		}
	}
	console.log("Fff");
	
	// If all checks pass, the board is complete
	return true;
};

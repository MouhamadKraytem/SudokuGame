export const isBoardComplete = (
	board: { value: number; isEditable: boolean }[][]
): boolean => {
	// Helper function to check if an array contains all numbers from 1 to 9 (excluding empty cells)
	const isUniqueSet = (
		arr: { value: number; isEditable: boolean }[]
	): boolean => {
		const seen = new Set<number>();
		for (let cell of arr) {
			if (cell.value < 1 || cell.value > 9 || seen.has(cell.value)) {
				return false; // Invalid or duplicate value
			}
			seen.add(cell.value);
		}
		return true;
	};

	// Check rows for completeness
	for (let row = 0; row < 9; row++) {
		const rowValues = board[row].filter((cell) => !cell.isEditable); // Filter out non-editable cells
		if (rowValues.length === 9 && !isUniqueSet(rowValues)) {
			// All cells should be filled
			return false;
		}
	}

	// Check columns for completeness
	for (let col = 0; col < 9; col++) {
		const columnValues = board
			.map((row) => row[col])
			.filter((cell) => !cell.isEditable);
		if (columnValues.length === 9 && !isUniqueSet(columnValues)) {
			return false;
		}
	}

	// Check 3x3 grids for completeness
	for (let boxRow = 0; boxRow < 3; boxRow++) {
		for (let boxCol = 0; boxCol < 3; boxCol++) {
			const grid: { value: number; isEditable: boolean }[] = [];
			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 3; col++) {
					const cell = board[boxRow * 3 + row][boxCol * 3 + col];
					if (!cell.isEditable) {
						// Only consider non-editable cells
						grid.push(cell);
					}
				}
			}
			if (grid.length === 9 && !isUniqueSet(grid)) {
				return false;
			}
		}
	}

	// If all checks pass, the board is complete
	return true;
};

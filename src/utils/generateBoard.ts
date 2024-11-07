type Cell = { value: number; isEditable: boolean };
type Board = Cell[][];

const EMPTY = 0;

// Generate puzzle based on difficulty
export function generatePuzzle(difficulty: "easy" | "medium" | "hard"): Board {
	const board = createFullBoard();
	const clues = getCluesCount(difficulty);
	removeCells(board, 81 - clues);
	return board;
}

// Create a valid, filled board using backtracking
function createFullBoard(): Board {
	const board: Board = Array.from({ length: 9 }, () =>
		Array.from({ length: 9 }, () => ({ value: EMPTY, isEditable: true }))
	);

	fillBoard(board);
	return board;
}

// Backtracking to fill the board with valid numbers
function fillBoard(board: Board): boolean {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col].value === EMPTY) {
				const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
				for (const num of numbers) {
					if (isSafe(board, row, col, num)) {
						board[row][col] = { value: num, isEditable: false };
						if (fillBoard(board)) return true;
						board[row][col] = { value: EMPTY, isEditable: true }; // Backtrack
					}
				}
				return false; // No valid number found, backtrack
			}
		}
	}
	return true; // Board is complete
}

// Helper function to check if a number is safe to place
function isSafe(board: Board, row: number, col: number, num: number): boolean {
	return (
		!board[row].some((cell) => cell.value === num) && // Check row
		!board.some((r) => r[col].value === num) && // Check column
		!get3x3Grid(board, row, col).some((cell) => cell.value === num) // Check 3x3 grid
	);
}

// Helper function to get the 3x3 grid for a given cell
function get3x3Grid(board: Board, row: number, col: number): Cell[] {
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	const grid: Cell[] = [];
	for (let r = startRow; r < startRow + 3; r++) {
		for (let c = startCol; c < startCol + 3; c++) {
			grid.push(board[r][c]);
		}
	}
	return grid;
}

// Shuffle the array randomly
function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Function to determine the number of clues based on difficulty
function getCluesCount(difficulty: "easy" | "medium" | "hard"): number {
	switch (difficulty) {
		case "easy":
			return 55; // Easier puzzle with more clues
		case "medium":
			return 32; // Moderate puzzle
		case "hard":
			return 28; // Harder puzzle with fewer clues
		default:
			return 36; // Default medium
	}
}

// Remove cells from the board to create the puzzle
function removeCells(board: Board, cellsToRemove: number): void {
	let removed = 0;
	const cells: [number, number][] = [];

	// Collect all board positions (row, col) to randomize cell removal
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			cells.push([row, col]);
		}
	}

	// Shuffle cells to remove them in a random order
	shuffleArray(cells);

	for (const [row, col] of cells) {
		if (board[row][col].value !== EMPTY) {
			const backup = board[row][col].value;
			board[row][col] = { value: EMPTY, isEditable: true };

			// Check if the puzzle still has a unique solution
			if (hasUniqueSolution(board)) {
				removed++;
			} else {
				board[row][col] = { value: backup, isEditable: false };
			}

			if (removed === cellsToRemove) {
				break; // Stop when we reach the target number of clues
			}
		}
	}
}

// Function to check if the puzzle has a unique solution
function hasUniqueSolution(board: Board): boolean {
	let solutions = 0;

	// Try to solve the board recursively
	function solve(board: Board): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col].value === EMPTY) {
					for (let num = 1; num <= 9; num++) {
						if (isSafe(board, row, col, num)) {
							board[row][col] = { value: num, isEditable: false };
							if (solve(board)) {
								solutions++;
								if (solutions > 1) return false; // More than one solution found
							}
							board[row][col] = { value: EMPTY, isEditable: true }; // Backtrack
						}
					}
					return false; // No solution found
				}
			}
		}
		return true; // Puzzle solved
	}

	solve(board);
	return solutions === 1; // Ensure only one solution
}

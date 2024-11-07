type Cell = { value: number; isEditable: boolean };
type Board = Cell[][];
const EMPTY = 0;

export function generatePuzzle(difficulty: "easy" | "medium" | "hard"): Board {
	const board = createFullBoard();
	const clues = getCluesCount(difficulty);
	removeCells(board, 81 - clues);
	return board;
}

// 1. Create a complete board using backtracking.
function createFullBoard(): Board {
	const board: Board = Array.from({ length: 9 }, () =>
		Array(9).fill({ value: EMPTY, isEditable: true })
	);
	fillBoard(board);
	return board;
}

function fillBoard(board: Board): boolean {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col].value === EMPTY) {
				const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
				for (const num of numbers) {
					if (isSafe(board, row, col, num)) {
						board[row][col] = { value: num, isEditable: false }; // Fill with a fixed number
						if (fillBoard(board)) return true;
						board[row][col] = { value: EMPTY, isEditable: true }; // Backtrack
					}
				}
				return false;
			}
		}
	}
	return true;
}

// 2. Remove cells based on difficulty.
// 2. Remove cells based on difficulty to create a solvable puzzle.
function getCluesCount(difficulty: "easy" | "medium" | "hard"): number {
	switch (difficulty) {
		case "easy":
			return 44; // Around 44 clues
		case "medium":
			return 32; // Around 32 clues
		case "hard":
			return 28; // Around 28 clues
		default:
			return 36;
	}
}

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
			board[row][col] = { value: EMPTY, isEditable: true }; // Make the cell editable and empty

			// Check if the puzzle still has a unique solution
			if (hasUniqueSolution(board)) {
				removed++;
			} else {
				board[row][col] = { value: backup, isEditable: false }; // Restore if no unique solution
			}

			if (removed === cellsToRemove) {
				break; // Stop when we reach the target number of clues
			}
		}
	}
}


// 3. Check if the board has a unique solution.
function hasUniqueSolution(board: Board): boolean {
	let solutions = 0;
	function solve(board: Board): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col].value === EMPTY) {
					for (let num = 1; num <= 9; num++) {
						if (isSafe(board, row, col, num)) {
							board[row][col] = { value: num, isEditable: false };
							if (solve(board)) {
								solutions++;
								if (solutions > 1) return true; // Stop if more than one solution
							}
							board[row][col] = { value: EMPTY, isEditable: true };
						}
					}
					return false;
				}
			}
		}
		return true;
	}
	solve(board);
	return solutions === 1;
}
// Utility functions
// Utility functions
function isSafe(board: Board, row: number, col: number, num: number): boolean {
	return (
		!board[row].some(cell => cell.value === num) && // Check row
		!board.some(r => r[col].value === num) &&       // Check column
		!get3x3Grid(board, row, col).some(cell => cell.value === num) // Check 3x3 grid
	);
}

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

function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

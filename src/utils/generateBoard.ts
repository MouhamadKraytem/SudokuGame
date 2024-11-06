type Board = number[][];

const EMPTY = 0;

export function generatePuzzle(difficulty: "easy" | "medium" | "hard"): Board {
	const board = createFullBoard();
	const clues = getCluesCount(difficulty);
	removeCells(board, 81 - clues);
	return board;
}

// 1. Create a complete board using backtracking.
function createFullBoard(): Board {
	const board: Board = Array.from({ length: 9 }, () => Array(9).fill(EMPTY));
	fillBoard(board);
	return board;
}

function fillBoard(board: Board): boolean {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === EMPTY) {
				const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
				for (const num of numbers) {
					if (isSafe(board, row, col, num)) {
						board[row][col] = num;
						if (fillBoard(board)) return true;
						board[row][col] = EMPTY;
					}
				}
				return false;
			}
		}
	}
	return true;
}

// 2. Remove cells based on difficulty.
function getCluesCount(difficulty: "easy" | "medium" | "hard"): number {
	switch (difficulty) {
		case "easy":
			return 44; // Around 36 clues
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
		if (board[row][col] !== EMPTY) {
			const backup = board[row][col];
			board[row][col] = EMPTY;

			// Check if the puzzle still has a unique solution
			if (hasUniqueSolution(board)) {
				removed++;
			} else {
				board[row][col] = backup; // Restore if no unique solution
			}

			if (removed === cellsToRemove) {
				break; // Stop when we reach the target number of clues
			}
		}
	}
}


// 3. Check if board has a unique solution.
function hasUniqueSolution(board: Board): boolean {
	let solutions = 0;
	function solve(board: Board): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col] === EMPTY) {
					for (let num = 1; num <= 9; num++) {
						if (isSafe(board, row, col, num)) {
							board[row][col] = num;
							if (solve(board)) {
								solutions++;
								if (solutions > 1) return true; // Stop if more than one solution
							}
							board[row][col] = EMPTY;
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
function isSafe(board: Board, row: number, col: number, num: number): boolean {
	return (
		!board[row].includes(num) &&
		!board.map((r) => r[col]).includes(num) &&
		!get3x3Grid(board, row, col).includes(num)
	);
}

function get3x3Grid(board: Board, row: number, col: number): number[] {
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	const grid: number[] = [];
	for (let r = startRow; r < startRow + 3; r++) {
		for (let c = startCol; c < startCol + 3; c++) {
			grid.push(board[r][c]);
		}
	}
	return grid;
}

function shuffleArray<T>(array: T[]): T[] {
	return array.sort(() => Math.random() - 0.5);
}


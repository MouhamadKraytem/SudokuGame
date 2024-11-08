type Cell = { value: number; isEditable: boolean };
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Board = Cell[][];

export function generateEmptyBoard(): Board {
	const emptyBoard: Board = Array.from({ length: 9 }, () =>
		Array.from({ length: 9 }, () => ({ value: 0, isEditable: true }))
	);
	return emptyBoard;
}

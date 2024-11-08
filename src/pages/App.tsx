import React, { useEffect, useState } from 'react';

//css
import './App.css';

//componant
import SelectionBar from '../componants/SelectionBar';
import Board from '../componants/Board';
import DifficultySelect from '../componants/DifficultySelect';

//utils
import {generatePuzzle} from '../utils/generateBoard'
import { findDuplicates } from '../utils/findDuplicates'

type Cell = { value: number; isEditable: boolean };
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Board = Cell[][];

interface AppProps {
	customBoard?: Board | null;
}
function App({ customBoard }: AppProps) {
	const initialBoard = generatePuzzle("easy");
	const [board, setBoard] = useState<Board>(initialBoard);
	const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
	const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
	const [duplicates, setDuplicates] = useState<{ [key: string]: boolean }>({});

	const handleNumberSelect = (number: number | null) => {
		setSelectedNumber(number);
	};

	const handleCellClick = (row: number, col: number) => {
		if (!board[row][col].isEditable) return; // Only allow clicks on editable cells

		const newBoard = board.map((r, rowIndex) =>
			r.map((cell, colIndex) =>
				rowIndex === row && colIndex === col
					? { ...cell, value: selectedNumber || 0 }
					: cell
			)
		);

		setBoard(newBoard);
		setDuplicates(findDuplicates(newBoard.map(row => row.map(cell => cell.value))));
	};

	const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
		setSelectedDifficulty(difficulty);  // Update the selected difficulty state
		const newBoard = generatePuzzle(difficulty);
		setBoard(newBoard);
		setDuplicates({});
		setSelectedNumber(null); // Optionally clear the selected number
	};

	useEffect(() => {
		if (customBoard) {
			setBoard(customBoard);
		}
	}, [customBoard]);
	
	return (
		<div className="app">
			<DifficultySelect onDifficultyChange={handleDifficultyChange} selectedDifficulty={selectedDifficulty} />
			<Board board={board} onCellClick={handleCellClick} duplicates={duplicates} />
			<SelectionBar
				onSelect={handleNumberSelect}
				selectedValue={selectedNumber}
				board={board}
				verifyOrSubmit={true}  // or false, depending on the desired behavior
			/>

		</div>
	);
}

export default App;

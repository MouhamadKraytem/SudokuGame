import React, { useState } from 'react'
import Board from '../componants/Board';

//css
import "./manualGrid.css";
//utils
import { generateEmptyBoard } from "../utils/generateEmptyBoard";
import { findDuplicates } from '../utils/findDuplicates';
import SelectionBar from '../componants/SelectionBar';
import { useNavigate } from 'react-router-dom';

type Cell = { value: number; isEditable: boolean };
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Board = Cell[][];

interface ManualBoardProps {
	onSubmitBoard: (board: Board) => void; // Prop to submit the custom board to the main app
}

export default function ManualBoard({ onSubmitBoard }: ManualBoardProps) {
	const initialBoard = generateEmptyBoard();
	const [board, setBoard] = useState<Board>(initialBoard);
	const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
	const [duplicates, setDuplicates] = useState<{ [key: string]: boolean }>({});
	const navigate = useNavigate();  

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

	const handleSubmit = () => {
		onSubmitBoard(board);  // Submit the custom board
		navigate('/');  // Navigate back to the App page with the new board
	};


	return (
		<div className='manual-grid-container'>
			<Board board={board} onCellClick={handleCellClick} duplicates={duplicates}></Board>
			<SelectionBar 
				onSelect={handleNumberSelect} 
				selectedValue={selectedNumber} 
				board={board} 
				verifyOrSubmit={false}
				onSubmit={handleSubmit} />
		</div>
	)
}


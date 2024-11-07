import React from 'react'
import Cell from './Cell';
import './board.css'
import { log } from 'console';


type BoardProps = {
	board: { value: number; isEditable: boolean }[][];
	onCellClick: (row: number, col: number) => void;
	duplicates: { [key: string]: boolean };
};



export default function Board({ board, onCellClick, duplicates }: BoardProps) {
	function printBoard(): void {
		for (let row = 0; row < 9; row++) {
			let rowValues = '';
			for (let col = 0; col < 9; col++) {
				rowValues += board[row][col].value + ' ';
			}
			console.log(rowValues.trim()); // Trim trailing spaces
		}
		console.log("#############################");
	}
	printBoard();
	return (
		<div className="board">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="board-row">
					{row.map((cell, colIndex) => (
						<Cell
							key={colIndex}
							value={cell.value}
							isEditable={cell.isEditable}
							onClick={() => onCellClick(rowIndex, colIndex)}
							isDuplicate={duplicates[`${rowIndex}-${colIndex}`]}
						/>
					))}
				</div>
			))}
		</div>
	);
}
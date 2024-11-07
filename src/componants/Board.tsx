import React from 'react'
import Cell from './Cell';
import './board.css'


type BoardProps = {
	board: { value: number; isEditable: boolean }[][];
	onCellClick: (row: number, col: number) => void;
	duplicates: { [key: string]: boolean };
};



export default function Board({ board, onCellClick, duplicates }: BoardProps) {
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
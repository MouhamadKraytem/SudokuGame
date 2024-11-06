import React from 'react'
import Cell from './Cell';
import './board.css'


type BoardProps = {
	board: number[][];  
	onCellClick: (row: number, col: number) => void;
	duplicates: { [key: string]: boolean };
};



export default function Board({ board, onCellClick, duplicates }: BoardProps) {
	console.log(board);
	
	return (
		<div className="board">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="board-row">
					{row.map((value, colIndex) => (
						<Cell
							key={colIndex}
							value={value}
							onClick={() => onCellClick(rowIndex, colIndex)}
							isDuplicate={duplicates[`${rowIndex}-${colIndex}`]}
						/>
					))}
				</div>
			))}
		</div>
	);
}

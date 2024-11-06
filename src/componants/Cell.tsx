import React from 'react'
import "./cell.css"

type CellType = {
	value: number;
	onClick: () => void; // Function to handle click events
	isDuplicate?: boolean;
};

export default function Cell({ value, onClick, isDuplicate }: CellType) {
	return (
		<div className={`cell-container ${isDuplicate ? 'duplicate' : ''}`} onClick={onClick}>
			<p className="value">{value >= 1 && value <= 9 ? value : ''}</p>
		</div>
	);
}

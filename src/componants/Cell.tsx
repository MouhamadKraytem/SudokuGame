import React from 'react'
import "./cell.css"

type CellType = {
	value: number;
	isEditable: boolean;
	onClick: () => void;
	isDuplicate?: boolean;
};


export default function Cell({ value, isEditable, onClick, isDuplicate }: CellType) {
	return (
		<div
			className={`cell-container ${isDuplicate ? 'duplicate' : ''} ${isEditable ? 'editable' : 'non-editable'}`}
			onClick={isEditable ? onClick : undefined} // Only allow click if editable
		>
			<p className="value">{value >= 1 && value <= 9 ? value : ''}</p>
		</div>
	);
}
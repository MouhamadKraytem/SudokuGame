// src/components/SelectionBar.tsx

import React, { useState } from 'react';
import './selectionBar.css';
import { isBoardComplete } from "../utils/isBoardCompleted";
type SelectionBarProps = {
	onSelect: (value: number | null) => void; // Callback to handle selected value
	selectedValue: number | null;   
	board: number[][];            // Currently selected value
};

export default function SelectionBar({ onSelect, selectedValue ,board}: SelectionBarProps) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const [showCompletionStatus, setShowCompletionStatus] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	const handleVerifyClick = () => {
		const complete = isBoardComplete(board);
		setIsComplete(complete);
		setShowCompletionStatus(true);
	};
	return (
		<div className="selection-bar">
			{numbers.map((number) => (
				<button
					key={number}
					className={`selection-button ${selectedValue === number ? 'selected' : ''}`}
					onClick={() => {
						if (selectedValue === number) {
							onSelect(null); // Clear selection
						} else {
							onSelect(number); // Set selected number
						}
					}}
				>
					{number}
				</button>
			))}
			<button 
				className='selection-button verify-button'
				onClick={handleVerifyClick}
				>
				verify
			</button>
			{showCompletionStatus && (
				<div
					className="completion-popup-overlay"
					onClick={() => setShowCompletionStatus(false)}
				>
					<div
						className="completion-popup"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
					>
						<p className="completion-message">
							{isComplete ? "The board is complete!" : "The board is not complete."}
						</p>
						<button className="close-button" onClick={() => setShowCompletionStatus(false)}>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

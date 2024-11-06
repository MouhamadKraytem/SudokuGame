// src/components/SelectionBar.tsx

import React from 'react';
import './selectionBar.css';

type SelectionBarProps = {
	onSelect: (value: number | null) => void; // Callback to handle selected value
	selectedValue: number | null;             // Currently selected value
};

export default function SelectionBar({ onSelect, selectedValue }: SelectionBarProps) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

		</div>
	);
}

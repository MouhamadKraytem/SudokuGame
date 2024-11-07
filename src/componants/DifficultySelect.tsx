import React from 'react'


//css
import "./difficultySelect.css";
// Types for Difficulty Select Props
type DifficultySelectProps = {
	onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
	selectedDifficulty: 'easy' | 'medium' | 'hard';
};

function DiffuctySelect({ onDifficultyChange, selectedDifficulty }: DifficultySelectProps) {
	return (
		<div className="difficulty-select">
			<button
				className={`difficulty-button ${selectedDifficulty === 'easy' ? 'active' : ''}`}
				onClick={() => selectedDifficulty !== 'easy' && onDifficultyChange('easy')}  // Prevent click if already selected
				disabled={selectedDifficulty === 'easy'}  // Disable button if selected
			>
				Easy
			</button>
			<button
				className={`difficulty-button ${selectedDifficulty === 'medium' ? 'active' : ''}`}
				onClick={() => selectedDifficulty !== 'medium' && onDifficultyChange('medium')}  // Prevent click if already selected
				disabled={selectedDifficulty === 'medium'}  // Disable button if selected
			>
				Medium
			</button>
			<button
				className={`difficulty-button ${selectedDifficulty === 'hard' ? 'active' : ''}`}
				onClick={() => selectedDifficulty !== 'hard' && onDifficultyChange('hard')}  // Prevent click if already selected
				disabled={selectedDifficulty === 'hard'}  // Disable button if selected
			>
				Hard
			</button>
			<button
				className='difficulty-button'
				onClick={()=>{console.log();}}
			>
				import game
			</button>
		</div>
	);
}

export default DiffuctySelect

import React, { useState } from 'react';

//css
import './App.css';

//componant
import SelectionBar from './componants/SelectionBar';
import Board from './componants/Board';
import DifficultySelect from './componants/DifficultySelect';

//utils
import { findDuplicates } from './utils/findDuplicates';
import { generatePuzzle } from './utils/generateBoard';

type Cell = { value: number; isEditable: boolean };
type Board = Cell[][];
function App() {
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

  return (
    <div className="app">
      <Board board={board} onCellClick={handleCellClick} duplicates={duplicates} />
      <SelectionBar onSelect={handleNumberSelect} selectedValue={selectedNumber} board={board}/>
      <DifficultySelect onDifficultyChange={handleDifficultyChange} selectedDifficulty={selectedDifficulty} />
    </div>
  );
}

export default App;

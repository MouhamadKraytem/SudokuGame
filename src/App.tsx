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


function App() {
  const initialBoard = generatePuzzle("easy");
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const handleNumberSelect = (number: number | null) => {
    setSelectedNumber(number);
  };

  const [duplicates, setDuplicates] = useState<{ [key: string]: boolean }>({});

  const handleCellClick = (row: number, col: number) => {
    const newBoard = [...board];
    if (selectedNumber) {
      newBoard[row][col] = selectedNumber;
    }else{
      newBoard[row][col] = 0; 
    }
    setBoard(newBoard);
    setDuplicates(findDuplicates(newBoard));
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
      <DifficultySelect onDifficultyChange={handleDifficultyChange} selectedDifficulty={selectedDifficulty} />
      <Board board={board} onCellClick={handleCellClick} duplicates={duplicates} />
      <SelectionBar onSelect={handleNumberSelect} selectedValue={selectedNumber} board={board}/>
    </div>
  );
}

export default App;

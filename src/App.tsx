import React, { useState } from 'react';

//css
import './App.css';

//componant
import SelectionBar from './componants/SelectionBar';
import Board from './componants/Board';

//utils
import { findDuplicates } from './utils/findDuplicates';

function App() {
  const initialBoard = Array(9).fill(null).map(() => Array(9).fill(0)); // 9x9 board initialized to 0
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

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

  return (
    <div className="app">
      <Board board={board} onCellClick={handleCellClick} duplicates={duplicates} />
      <SelectionBar onSelect={handleNumberSelect} selectedValue={selectedNumber}/>
      <p>Selected Number: {selectedNumber}</p>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route , Routes } from "react-router-dom";
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import ManualBoard from './pages/ManualBoard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type Cell = { value: number; isEditable: boolean };
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Board = Cell[][];

function Main() {
  const [customBoard, setCustomBoard] = useState<Board | null>(null);

  const handleBoardSubmit = (board: Board) => {
    setCustomBoard(board);
  };

  return (
    <Routes>
      <Route path="/" element={<App customBoard={customBoard} />} />
      <Route path="/manual" element={<ManualBoard onSubmitBoard={handleBoardSubmit} />} />
    </Routes>
  );
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

'use client';

import { useState } from 'react';
import SudokuBoard from '../components/SudokuBoard';
import SudokuControls from '../components/SudokuControls';
import { SudokuGrid, generateRandomSudoku, isValidSudoku, solveSudoku } from '@/utils/sudokuUtils';

export default function Home() {
  const [grid, setGrid] = useState<SudokuGrid>(() => generateRandomSudoku());
  const [originalGrid, setOriginalGrid] = useState<SudokuGrid>(() => generateRandomSudoku());
  const [isSolved, setIsSolved] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSolving, setIsSolving] = useState(false);

  const handleCellChange = (row: number, col: number, value: number | null) => {
    if (isSolved) return;
    
    const newGrid = grid.map((gridRow: (number | null)[]) => [...gridRow]);
    newGrid[row][col] = value;
    setGrid(newGrid);
    setError('');
  };

  const handleSolve = async () => {
    if (!isValidSudoku(grid)) {
      setError('Invalid Sudoku puzzle! Please check your input.');
      return;
    }

    setIsSolving(true);
    setError('');

    // Use setTimeout to allow UI to update and show loading state
    setTimeout(() => {
      try {
        const solution = solveSudoku(grid);
        if (solution) {
          setGrid(solution);
          setIsSolved(true);
          setError('');
        } else {
          setError('No solution exists for this puzzle or solving timed out!');
        }
      } catch {
        setError('An error occurred while solving the puzzle.');
      } finally {
        setIsSolving(false);
      }
    }, 10);
  };

  const handleReset = () => {
    const newGrid = generateRandomSudoku();
    setGrid(newGrid);
    setOriginalGrid(newGrid);
    setIsSolved(false);
    setError('');
  };

  const handleLoadPrefilled = () => {
    const prefilledGrid: SudokuGrid = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ];
    setGrid(prefilledGrid);
    setOriginalGrid(prefilledGrid);
    setIsSolved(false);
    setError('');
  };

  const handleClearBoard = () => {
    const emptyGrid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));
    setGrid(emptyGrid);
    setOriginalGrid(emptyGrid);
    setIsSolved(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sudoku Solver</h1>
          <p className="text-gray-600">Solve any Sudoku puzzle with ease</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <SudokuBoard
              grid={grid}
              originalGrid={originalGrid}
              isSolved={isSolved}
              onCellChange={handleCellChange}
            />
            
            {isSolving && (
              <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
                Solving puzzle... Please wait.
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <SudokuControls
              onSolve={handleSolve}
              onReset={handleReset}
              onLoadPrefilled={handleLoadPrefilled}
              onClearBoard={handleClearBoard}
              isSolved={isSolved}
              isSolving={isSolving}
            />
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Instructions</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Click on any empty cell to edit it</li>
                <li>• Type numbers 1-9 or use Backspace to clear</li>
                <li>• Use the Solve button to automatically solve the puzzle</li>
                <li>• Reset generates a new random puzzle</li>
                <li>• Load Prefilled loads a classic Sudoku puzzle</li>
                <li>• Clear Board starts with an empty grid</li>
                <li className="text-xs text-gray-500 mt-4">
                  <strong>Color coding:</strong> Original numbers are blue, solved numbers are green
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

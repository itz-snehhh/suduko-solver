'use client';

import { useState } from 'react';
import { SudokuGrid } from '@/utils/sudokuUtils';

interface SudokuBoardProps {
  grid: SudokuGrid;
  originalGrid: SudokuGrid;
  isSolved: boolean;
  onCellChange: (row: number, col: number, value: number | null) => void;
}

export default function SudokuBoard({ grid, originalGrid, isSolved, onCellChange }: SudokuBoardProps) {
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (isSolved) return;
    
    // If it's an original number, don't allow editing
    if (originalGrid[row][col] !== null) return;
    
    setSelectedCell([row, col]);
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (isSolved || originalGrid[row][col] !== null) return;
    
    if (e.key >= '1' && e.key <= '9') {
      onCellChange(row, col, parseInt(e.key));
      setSelectedCell(null);
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      onCellChange(row, col, null);
      setSelectedCell(null);
    } else if (e.key === 'Escape') {
      setSelectedCell(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    if (isSolved || originalGrid[row][col] !== null) return;
    
    const value = e.target.value;
    if (value === '') {
      onCellChange(row, col, null);
    } else if (/^[1-9]$/.test(value)) {
      onCellChange(row, col, parseInt(value));
    }
  };

  const handleInputBlur = () => {
    setSelectedCell(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-9 gap-0 border-4 border-gray-800">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isOriginal = originalGrid[rowIndex][colIndex] !== null;
            const isSolvedCell = !isOriginal && cell !== null && isSolved;
            const isEditable = !isOriginal && !isSolved;
            const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
            
            // Determine border styling for 3x3 boxes
            const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex < 8;
            const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
            const isLeftBorder = colIndex % 3 === 0;
            const isTopBorder = rowIndex % 3 === 0;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-12 h-12 flex items-center justify-center text-lg font-semibold relative
                  ${isTopBorder ? 'border-t-4 border-t-gray-800' : 'border-t border-t-gray-300'}
                  ${isBottomBorder ? 'border-b-4 border-b-gray-800' : 'border-b border-b-gray-300'}
                  ${isLeftBorder ? 'border-l-4 border-l-gray-800' : 'border-l border-l-gray-300'}
                  ${isRightBorder ? 'border-r-4 border-r-gray-800' : 'border-r border-r-gray-300'}
                  ${isOriginal 
                    ? 'bg-blue-100 text-blue-800' 
                    : isSolvedCell 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-white hover:bg-gray-50'
                  }
                  ${isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''}
                  transition-colors duration-150
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                tabIndex={isEditable ? 0 : -1}
              >
                {isSelected && isEditable ? (
                  <input
                    type="text"
                    className="w-full h-full text-center text-lg font-semibold bg-transparent border-none outline-none"
                    value={cell || ''}
                    onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                    onBlur={handleInputBlur}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    autoFocus
                    maxLength={1}
                    pattern="[1-9]"
                  />
                ) : (
                  <span>{cell || ''}</span>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Click on empty cells to edit • Type 1-9 or use Backspace to clear</p>
      </div>
    </div>
  );
} 
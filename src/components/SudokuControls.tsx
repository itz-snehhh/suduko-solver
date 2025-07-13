'use client';

interface SudokuControlsProps {
  onSolve: () => void;
  onReset: () => void;
  onLoadPrefilled: () => void;
  onClearBoard: () => void;
  isSolved: boolean;
  isSolving: boolean;
}

export default function SudokuControls({
  onSolve,
  onReset,
  onLoadPrefilled,
  onClearBoard,
  isSolved,
  isSolving
}: SudokuControlsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Controls</h3>
      
      <div className="space-y-3">
        <button
          onClick={onSolve}
          disabled={isSolved || isSolving}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200
            ${isSolved || isSolving
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
            }
          `}
        >
          {isSolved ? '✓ Solved!' : isSolving ? 'Solving...' : 'Solve Puzzle'}
        </button>

        <button
          onClick={onReset}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          New Random Puzzle
        </button>

        <button
          onClick={onLoadPrefilled}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Load Classic Puzzle
        </button>

        <button
          onClick={onClearBoard}
          className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Clear Board
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Quick Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click empty cells to edit them</li>
          <li>• Type numbers 1-9 directly</li>
          <li>• Press Backspace or Delete to clear</li>
          <li>• Press Escape to cancel editing</li>
          <li>• Original numbers cannot be edited</li>
        </ul>
      </div>
    </div>
  );
} 
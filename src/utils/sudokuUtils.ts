export type SudokuGrid = (number | null)[][];

// Ultra-optimized Sudoku solver with timeout protection
class SudokuSolver {
  private grid: SudokuGrid;
  private startTime: number;
  private readonly TIMEOUT_MS = 1000; // 1 second timeout

  constructor(grid: SudokuGrid) {
    this.grid = grid.map(row => [...row]);
    this.startTime = Date.now();
  }

  private isTimeout(): boolean {
    return Date.now() - this.startTime > this.TIMEOUT_MS;
  }

  private isValidPlacement(row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (this.grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (this.grid[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  }

  private findEmptyCell(): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] === null) {
          return [row, col];
        }
      }
    }
    return null;
  }

  private solveBacktracking(): boolean {
    if (this.isTimeout()) return false;

    const emptyCell = this.findEmptyCell();
    if (!emptyCell) return true; // Puzzle is solved

    const [row, col] = emptyCell;

    // Try numbers 1-9
    for (let num = 1; num <= 9; num++) {
      if (this.isValidPlacement(row, col, num)) {
        this.grid[row][col] = num;
        
        if (this.solveBacktracking()) {
          return true;
        }
        
        this.grid[row][col] = null; // Backtrack
      }
    }

    return false;
  }

  public solve(): SudokuGrid | null {
    if (this.solveBacktracking()) {
      return this.grid;
    }
    return null;
  }
}

// Simple and fast solve function
export function solveSudoku(grid: SudokuGrid): SudokuGrid | null {
  const solver = new SudokuSolver(grid);
  return solver.solve();
}

// Fast validation
export function isValidSudoku(grid: SudokuGrid): boolean {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell !== null) {
        if (seen.has(cell)) return false;
        seen.add(cell);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const cell = grid[row][col];
      if (cell !== null) {
        if (seen.has(cell)) return false;
        seen.add(cell);
      }
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cell = grid[boxRow * 3 + i][boxCol * 3 + j];
          if (cell !== null) {
            if (seen.has(cell)) return false;
            seen.add(cell);
          }
        }
      }
    }
  }

  return true;
}

// Generate puzzles using pre-solved templates
export function generateRandomSudoku(): SudokuGrid {
  // Collection of valid solved Sudoku puzzles
  const templates: SudokuGrid[] = [
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    [
      [8, 1, 2, 7, 5, 3, 6, 4, 9],
      [9, 4, 3, 6, 8, 2, 1, 7, 5],
      [6, 7, 5, 4, 9, 1, 2, 8, 3],
      [1, 5, 4, 2, 3, 7, 8, 9, 6],
      [3, 6, 9, 8, 4, 5, 7, 2, 1],
      [2, 8, 7, 1, 6, 9, 5, 3, 4],
      [5, 2, 1, 9, 7, 4, 3, 6, 8],
      [4, 3, 8, 5, 2, 6, 9, 1, 7],
      [7, 9, 6, 3, 1, 8, 4, 5, 2]
    ],
    [
      [2, 7, 6, 3, 1, 4, 9, 5, 8],
      [8, 5, 4, 9, 6, 2, 7, 1, 3],
      [9, 1, 3, 8, 7, 5, 2, 6, 4],
      [4, 6, 8, 1, 2, 7, 3, 9, 5],
      [5, 9, 7, 4, 3, 8, 6, 2, 1],
      [1, 3, 2, 5, 9, 6, 4, 8, 7],
      [3, 2, 5, 7, 8, 9, 1, 4, 6],
      [6, 4, 1, 2, 5, 3, 8, 7, 9],
      [7, 8, 9, 6, 4, 1, 5, 3, 2]
    ]
  ];

  // Pick a random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  const puzzle = template.map(row => [...row]);

  // Remove some numbers to create the puzzle
  const cellsToRemove = 35 + Math.floor(Math.random() * 15); // 35-50 cells removed
  
  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    puzzle[row][col] = null;
  }
  
  return puzzle;
}



# 🧩 Sudoku Solver

A beautiful, interactive Sudoku solver built with Next.js, TypeScript, and Tailwind CSS. Solve any Sudoku puzzle with ease using an optimized backtracking algorithm with timeout protection.

![Sudoku Solver Demo](https://img.shields.io/badge/Status-Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

## ✨ Features

### 🎮 Interactive Gameplay
- **Click to Edit**: Click on any empty cell to start editing
- **Direct Input**: Type numbers 1-9 directly into cells
- **Keyboard Navigation**: Use arrow keys, Tab, and Enter for navigation
- **Smart Validation**: Real-time validation of Sudoku rules

### 🧠 Intelligent Solver
- **Auto-Solve**: One-click solution for any valid puzzle
- **Timeout Protection**: 1-second timeout prevents hanging
- **Optimized Algorithm**: Fast backtracking with constraint checking
- **Error Handling**: Clear feedback for invalid puzzles

### 🎨 Beautiful UI
- **3x3 Box Visualization**: Clear visual separation with thick borders
- **Color Coding**: 
  - 🔵 Blue: Original/pre-filled numbers (non-editable)
  - 🟢 Green: Solved numbers
  - ⚪ White: Editable cells
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern Styling**: Clean, professional appearance with Tailwind CSS

### 📊 Multiple Puzzle Sources
- **Random Generation**: Generate new puzzles instantly
- **Classic Puzzle**: Load a pre-filled classic Sudoku
- **Manual Input**: Start with an empty board
- **Clear Board**: Reset to empty state

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd sudoku-solver
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Alternative: Use the Helper Script
```bash
chmod +x start.sh
./start.sh
```

## 🎯 How to Play

### Basic Controls
1. **Start a Puzzle:**
   - Click "New Random Puzzle" for a random challenge
   - Click "Load Classic Puzzle" for a pre-filled puzzle
   - Click "Clear Board" to start from scratch

2. **Input Numbers:**
   - Click on any empty cell to select it
   - Type a number (1-9) to fill the cell
   - Press Backspace or Delete to clear a cell
   - Press Escape to cancel editing

3. **Solve the Puzzle:**
   - Click "Solve Puzzle" to automatically solve
   - Watch the solution appear with green highlighting
   - Original numbers remain blue and uneditable

### Keyboard Shortcuts
- **1-9**: Input numbers
- **Backspace/Delete**: Clear cell
- **Escape**: Cancel editing
- **Tab**: Navigate between cells
- **Arrow Keys**: Move between cells

## 🏗️ Technical Architecture

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management

### Core Components
```
src/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── SudokuBoard.tsx       # 9x9 grid component
│   └── SudokuControls.tsx    # Control buttons
└── utils/
    └── sudokuUtils.ts        # Solver algorithm & utilities
```

### Algorithm Details
- **Backtracking Solver**: Recursive depth-first search
- **Timeout Protection**: 1-second maximum solve time
- **Constraint Checking**: Row, column, and 3x3 box validation
- **Template-Based Generation**: Uses pre-solved puzzles for instant generation

## 🎨 UI/UX Features

### Visual Design
- **Clean Grid Layout**: Professional 9x9 Sudoku board
- **3x3 Box Borders**: Thick borders clearly separate 3x3 regions
- **Color-Coded Cells**: Visual distinction between original, solved, and editable cells
- **Hover Effects**: Smooth transitions and visual feedback
- **Loading States**: Clear indication during solving process

### Responsive Design
- **Mobile-Friendly**: Optimized for touch devices
- **Desktop Optimized**: Full keyboard navigation support
- **Flexible Layout**: Adapts to different screen sizes

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure
```
sudoku-solver/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md              # This file
```

### Key Technologies
- **Next.js 15**: Modern React framework
- **TypeScript 5**: Type safety and better DX
- **Tailwind CSS 4**: Utility-first CSS framework
- **ESLint**: Code quality and consistency

## 🚀 Performance

### Optimizations
- **Timeout Protection**: Prevents infinite loops
- **Template-Based Generation**: Instant puzzle creation
- **Efficient Validation**: O(n²) validation algorithm
- **Minimal Re-renders**: Optimized React component updates

### Performance Metrics
- **Puzzle Generation**: ~1ms
- **Solving Time**: <1 second (with timeout)
- **Memory Usage**: Minimal (no complex data structures)
- **Bundle Size**: Optimized with Next.js

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Write clear, documented code

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Sudoku Community**: For puzzle-solving algorithms and techniques

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include browser console errors if applicable

---

**Happy Sudoku Solving! 🧩✨**

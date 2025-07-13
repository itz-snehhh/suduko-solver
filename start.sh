#!/bin/bash

# Navigate to the sudoku-solver directory and start the development server
echo "Starting Sudoku Solver..."
echo "Make sure you're in the sudoku-solver directory"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found!"
    echo "Please run this script from the sudoku-solver directory"
    echo "Current directory: $(pwd)"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev 
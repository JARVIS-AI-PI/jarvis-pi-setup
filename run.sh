#!/bin/bash
# Start Jarvis AI interface

cd "$(dirname "$0")"

echo "Launching Jarvis AI..."

# Make sure Electron is installed
if ! command -v electron &> /dev/null; then
    echo "Electron not found. Installing..."
    npm install electron -g
fi

# Start the main Electron process
electron main.js

#!/bin/bash

echo "🛠️ Installing JARVIS dependencies..."

# Update system
sudo apt update && sudo apt install -y curl git build-essential

# Install Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Electron globally (for UI)
npm install --save electron

# Optional: install espeak or voice packages here later

# Make run.sh executable
chmod +x run.sh

echo "✅ All set! Run JARVIS with: ./run.sh"

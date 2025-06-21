#!/bin/bash

echo "🛠️ Installing JARVIS requirements..."

# Update system packages
sudo apt update && sudo apt install -y nodejs npm espeak

# Install Electron globally (in case it's not already)
npm install --save electron
npm install axios

# Optional: Install Electron globally if preferred
# sudo npm install -g electron

echo "✅ Dependencies installed."

# Create JARVIS desktop shortcut
DESKTOP_FILE="$HOME/Desktop/JARVIS.desktop"
ICON_PATH="$PWD/assets/icon.png" # Replace with your real icon path

echo "[Desktop Entry]
Name=JARVIS AI
Exec=$PWD/run.sh
Icon=$ICON_PATH
Terminal=false
Type=Application
Categories=Utility;" > "$DESKTOP_FILE"

chmod +x "$DESKTOP_FILE"
chmod +x run.sh

echo "🎉 Setup complete! Launch JARVIS from the desktop or by running ./run.sh"

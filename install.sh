#!/bin/bash

echo "🔧 Installing Jarvis AI Dependencies..."
sudo apt update && sudo apt upgrade -y

# System packages
sudo apt install -y espeak aplay libasound2-dev python3-pip python3-dev build-essential nmap git curl xdg-utils

# Node.js (if not already installed)
if ! command -v node &> /dev/null
then
  echo "⚙️ Installing Node.js LTS..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
fi

# Python dependencies
pip3 install SpeechRecognition pyaudio

# Node.js dependencies
npm install

# Make desktop launcher
mkdir -p ~/.config/autostart
cp Jarvis.desktop ~/.config/autostart/Jarvis.desktop

# Permissions
chmod +x run.sh
chmod +x install.sh

echo "✅ Installation complete. You can run Jarvis now with:"
echo "  ./run.sh"

#!/bin/bash

echo "🧠 Installing Jarvis AI Dependencies..."

sudo apt update && sudo apt install -y espeak python3 python3-pyaudio python3-pip nodejs npm xinit unclutter git

# Python packages
pip3 install SpeechRecognition pyttsx3 pyaudio

# Node + Electron
sudo npm install -g electron

# Clone your GitHub repo
mkdir -p $HOME/Desktop/JarvisAI
cd $HOME/Desktop/JarvisAI
git clone https://github.com/JARVIS-AI-PI/jarvis-pi-setup.git .

echo "✅ All Dependencies Installed!"
echo "🧠 You can now launch Jarvis AI from the desktop icon."

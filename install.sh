#!/usr/bin/env bash
set -e
echo "🔧 Installing Jarvis AI..."

# Update and install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm python3 python3-pip espeak libasound2-dev portaudio19-dev libatlas-base-dev git curl xdotool wmctrl

# Install Python voice libs
pip3 install --user SpeechRecognition pyttsx3 pyaudio vosk

# Setup Desktop folder
DESKTOP="$HOME/Desktop"
JDIR="$DESKTOP/Jarvis"
rm -rf "$JDIR"
mkdir -p "$JDIR/app" "$JDIR/voice"

# Copy app files
cp -r app/* "$JDIR/app/"
cp -r voice/* "$JDIR/voice/"

# Create launcher script
cat > "$JDIR/start.sh" << 'EOF'
#!/usr/bin/env bash
cd "\$(dirname "\$0")/app"
npm install --no-save
npm start
EOF
chmod +x "$JDIR/start.sh"

# Create desktop entry
cat > "$DESKTOP/jarvis.desktop" << 'EOF'
[Desktop Entry]
Name=Jarvis AI
Comment=Launch Jarvis AI Assistant
Exec=bash -c "\$HOME/Desktop/Jarvis/start.sh"
Icon=\$HOME/Desktop/Jarvis/app/icon.png
Terminal=false
Type=Application
Categories=Utility;
EOF
chmod +x "$DESKTOP/jarvis.desktop"

echo "✅ Installation complete! Click the Jarvis AI icon on Desktop."

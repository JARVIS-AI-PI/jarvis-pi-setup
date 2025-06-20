#!/bin/bash

echo "🔧 Starting JARVIS AI Installation for Raspberry Pi Zero 2 W..."

# STEP 1: SYSTEM UPDATES
sudo apt update && sudo apt upgrade -y

# STEP 2: INSTALL ESSENTIAL SYSTEM TOOLS
sudo apt install -y git curl wget nano unclutter \
  build-essential python3 python3-pip \
  libasound2 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
  libxss1 libxcomposite1 libxrandr2 libxdamage1 libxkbcommon0 libx11-xcb1 \
  xinit xserver-xorg x11-xserver-utils lxde-core lxterminal lxde \
  alsa-utils espeak mpg123 \
  bluez pulseaudio

# STEP 3: INSTALL NODE.JS LTS (v18 or compatible)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# STEP 4: INSTALL PYTHON VOICE TOOLS
pip3 install SpeechRecognition pyaudio

# STEP 5: INSTALL ELECTRON
npm install -g electron@25.3.1 --unsafe-perm=true --allow-root

# STEP 6: INSTALL PROJECT DEPENDENCIES
cd "$(dirname "$0")"
npm install

# STEP 7: MAKE SCRIPTS EXECUTABLE
chmod +x run.sh
chmod +x mic-listener.py
chmod +x speak-output.py

# STEP 8: CREATE AUTOSTART ENTRY
mkdir -p ~/.config/autostart
cat <<EOF > ~/.config/autostart/Jarvis.desktop
[Desktop Entry]
Type=Application
Name=Jarvis AI
Exec=/home/pi/jarvis-pi-setup/run.sh
Icon=/home/pi/jarvis-pi-setup/jarvis-icon.png
Comment=Start Jarvis AI
EOF

# STEP 9: HIDE MOUSE CURSOR
echo '@unclutter -idle 0' >> ~/.config/lxsession/LXDE-pi/autostart

# STEP 10: SETUP AUDIO
amixer set PCM 100%
amixer set Master 100%
sudo systemctl enable pulseaudio
pulseaudio --start

# FINAL MESSAGE
echo ""
echo "✅ JARVIS AI installation complete!"
echo "📦 Run with: ./run.sh"
echo "📡 If everything works, JARVIS will launch on next reboot!"

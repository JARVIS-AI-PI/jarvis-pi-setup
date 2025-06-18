#!/bin/bash
echo "Installing dependencies..."
sudo apt update && sudo apt install -y nodejs npm espeak python3 python3-pip xdotool wmctrl
sudo npm install -g electron --unsafe-perm=true --allow-root

echo "Creating Jarvis folder on Desktop..."
mkdir -p ~/Desktop/Jarvis
cd ~/Desktop/Jarvis

echo "Setting up package.json and Electron app..."
cat > package.json << 'EOF'
{
  "name": "jarvis-pi-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "dependencies": {
    "electron": "^25.0.0",
    "express": "^4.18.2"
  }
}
EOF

cat > main.js << 'EOF'
const { app, BrowserWindow } = require('electron');
function createWindow () {
  const win = new BrowserWindow({
    width: 320,
    height: 240,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
}
app.whenReady().then(() => {
  createWindow();
});
EOF

cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Jarvis AI</title></head>
<body style="background:black;color:white;text-align:center;">
<h2>Hi, I'm Jarvis AI</h2>
<p>Listening...</p>
</body>
</html>
EOF

echo "Installing npm packages..."
npm install

echo "Creating desktop launcher..."
cat > ~/Desktop/jarvis.desktop << 'EOF'
[Desktop Entry]
Name=Jarvis AI
Exec=npm start --prefix /home/pi/Desktop/Jarvis
Icon=utilities-terminal
Terminal=false
Type=Application
Categories=Utility;
EOF

chmod +x ~/Desktop/jarvis.desktop

echo "Done. You can now launch Jarvis AI from your Desktop."

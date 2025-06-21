#!/bin/bash

echo "🚀 Starting JARVIS..."

# Navigate to the JARVIS root directory
cd "$(dirname "$0")"

# Set OpenAI API Key (optional: can be exported system-wide too)
# export OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx

# Start Electron app
npx electron .

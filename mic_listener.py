import vosk, sys, json, sounddevice as sd
model = vosk.Model("/home/pi/Desktop/Jarvis/voice/vosk-model")
with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16', channels=1) as stream:
    rec = vosk.KaldiRecognizer(model, 16000)
    while True:
        data = stream.read(4000)
        if rec.AcceptWaveform(data):
            print(json.loads(rec.Result())['text'])

import speech_recognition as sr
r = sr.Recognizer()
with sr.Microphone() as source:
    print("Listening...")
    audio = r.listen(source)
    try:
        print("You said: " + r.recognize_google(audio))
    except:
        print("Sorry, could not recognize.")

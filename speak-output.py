# speak-output.py
import sys
import os

text = " ".join(sys.argv[1:])
os.system(f'espeak \"{text}\"")

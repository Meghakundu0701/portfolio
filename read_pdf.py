import pdfplumber
import sys

sys.stdout.reconfigure(encoding='utf-8')

with pdfplumber.open('RESUMe.pdf') as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            print(text)

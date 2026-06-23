# Fake News Detection Using Machine Learning

## Overview
This project is a Fake News Detection System that uses Machine Learning and Natural Language Processing (NLP) techniques to classify news articles as REAL or FAKE.

## Features
- News classification using Machine Learning
- Text preprocessing and cleaning
- TF-IDF Vectorization
- Passive Aggressive Classifier
- User-friendly web interface
- Real-time prediction

## Technologies Used
- Python
- Flask
- HTML
- CSS
- JavaScript
- Scikit-learn
- Pandas
- NumPy

## Project Structure

```
fake-news-detection/
│
├── models/
│   ├── model.pkl
│   ├── vectorizer.pkl
│   ├── feature_coefficients.json
│   └── model_status.json
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.py
├── model_trainer.py
├── requirements.txt
├── vercel.json
└── README.md
```

## Dataset
The project uses a news dataset containing real and fake news articles for training and evaluation.

## Machine Learning Model
- TF-IDF Vectorizer
- Passive Aggressive Classifier

## Installation

```bash
git clone https://github.com/Meghakundu0701/fake-news-detection.git
cd fake-news-detection
pip install -r requirements.txt
python server.py
```

## Author
**Megha Kundu**

B.Tech Computer Science Engineering

## License
This project is developed for educational and research purposes.

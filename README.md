# 📰 Fake News Detection Using Machine Learning

## 🌐 Live Demo

🚀 Try the application here:

**https://fake-news-detector-ruby.vercel.app/**

---

## 📖 Overview

Fake News Detection is a Machine Learning-based web application that analyzes news content and predicts whether the news is **REAL** or **FAKE**.

The project uses Natural Language Processing (NLP) techniques and a Passive Aggressive Classifier to classify news articles with high accuracy. Users can enter news text through a simple web interface and instantly receive a prediction.

---

## ✨ Features

- Detects Fake and Real News
- Real-time Prediction
- Interactive Web Interface
- NLP-based Text Processing
- Machine Learning Classification
- Feature Importance Analysis
- Fast and Lightweight Deployment

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Passive Aggressive Classifier

### Libraries
- Pandas
- NumPy
- Joblib / Pickle

### Deployment
- Vercel
- GitHub

---

## 📂 Project Structure

```text
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

---

## ⚙️ How It Works

1. User enters news content.
2. Text is cleaned and preprocessed.
3. TF-IDF converts text into numerical features.
4. The trained Passive Aggressive Classifier analyzes the input.
5. The model predicts whether the news is **REAL** or **FAKE**.
6. Results are displayed instantly on the web interface.

---

## 🧠 Machine Learning Model

### Algorithm Used
- Passive Aggressive Classifier

### NLP Technique
- TF-IDF (Term Frequency – Inverse Document Frequency)

### Model Workflow
- Data Collection
- Data Preprocessing
- Feature Extraction using TF-IDF
- Model Training
- Model Evaluation
- Prediction

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Meghakundu0701/fake-news-detection.git
```

Navigate to the project directory:

```bash
cd fake-news-detection
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python server.py
```

Open your browser and visit:

```text
http://localhost:5000
```

---

## 📊 Dataset

The model was trained on a labeled news dataset containing both real and fake news articles.

Dataset features include:
- News Title
- News Content
- Label (REAL / FAKE)

---

## 🎯 Future Improvements

- Multi-language Fake News Detection
- Deep Learning Models
- News Source Credibility Analysis
- User Authentication
- News URL Verification
- Improved Accuracy with Larger Datasets

---

## 👩‍💻 Author

**Megha Kundu**

B.Tech – Computer Science Engineering

Jaypee University

GitHub: https://github.com/Meghakundu0701

---

## 📜 License

This project is developed for educational, research, and learning purposes.

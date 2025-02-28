# *FarmWise.AI*  
*Empowering Smallholder Farmers with AI-Driven Insights*  

## *Table of Contents*  
- [Introduction](#introduction)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Machine Learning Models](#machine-learning-models)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

## *Introduction*  
FarmWise.AI is an *AI-powered smart farming platform* designed to help *smallholder farmers* optimize crop management, resource usage, and overall productivity. With *real-time AI insights*, interactive tools, and multilingual support, the platform ensures farmers make data-driven decisions to improve yields and reduce losses.  

## *Features*  

### *🌱 AI-Driven Pest & Disease Detection (Image-Based Diagnosis)*  
- Farmers can *upload photos* of their crops through a mobile-friendly UI.  
- AI model detects *pests, diseases, and nutrient deficiencies*.  
- Provides *real-time solutions* based on a *vast agricultural database*.  

### *📈 AI Crop Yield Prediction*  
- AI suggests the *best crops* to plant based on:  
  ✅ *Historical yield data*  
  ✅ *Regional climate conditions*  
  ✅ *Soil health indicators*  
- Farmers receive *early yield forecasts* to plan ahead.  

### *🌾 AI Crop Recommendation*  
- Suggests the *optimal crops* to grow in a specific region based on:  
  ✅ *Soil type and fertility*  
  ✅ *Weather conditions*  
  ✅ *Water availability*  
- Helps farmers maximize profits by recommending *seasonal crops*.  

### *💬 AI-Powered Chatbot (Multilingual & Voice Support)*  
- Farmers can ask questions in their *local language*.  
- The chatbot provides *real-time responses* about:  
  ✅ *Crop diseases*  
  ✅ *Best farming practices*  
  ✅ *Weather updates*  
  ✅ *Soil conditions*  
- Supports *voice-based interaction* for easy access.  

### *🌦 Weather Forecast & Farming Insights*  
- Provides *real-time weather updates* based on farm location.  
- Alerts on *rainfall, temperature changes, and extreme conditions*.  
- Helps farmers prepare for *weather-related farming decisions*.  

### *📰 Farming News & Best Practices*  
- Keeps farmers *updated* with the latest news in agriculture.  
- Suggests *modern techniques & sustainable practices*.  
- Helps farmers adapt to *changing market & climate conditions*.  

### *🌍 Multilingual Support (Language Switching)*  
- Farmers can *switch languages instantly* for better understanding.  
- Uses *Google Cloud Translation API* to support *regional languages*.  
- Enables *better accessibility* for the farmers worldwide.  

---

## *Tech Stack*  

### *Frontend (User Interface for Farmers)*  
- *Framework:* React  

### *Backend (AI Processing, Recommendations, and APIs)*  
- *Framework:* FastAPI (high-performance backend)  
- *Server:* Flask (for AI inference and processing)  
- *Database:* MongoDB  
- *Cloud Storage:* Cloudinary (for storing images)  

### *AI & Machine Learning (Smart Farming Analytics)*  
- *Model Training:* TensorFlow  
- *Crop Monitoring & Pest Detection:* YOLO v8  
- *Yield Prediction:* Random Forest, Keras  
- *Crop Recommendation:* Random Forest, TensorFlow  
- *Chatbot AI:* Google Gemini API (for smart conversational AI)  

### *Data Sources & APIs*  
- *Weather Data:* OpenWeather API  
- *Language Processing:* Google Gemini API (for text summarization, predictions, and recommendations)  
- *Voice Recognition & Language Translation:* Google Cloud Translation API  

### *Development & Collaboration*  
- *Google IDX:* Cloud-based development and collaboration environment  

---

## *Machine Learning Models*  

### *1️⃣ Pest & Disease Detection (YOLO v8)*  
- Uses *YOLO v8 (You Only Look Once)* for *real-time image detection*.  
- Identifies *pests, diseases, and deficiencies* based on uploaded crop images.  
- Provides *instant remedies* and solutions.  

### *2️⃣ Crop Yield Prediction (Random Forest, Keras, TensorFlow)*  
- Analyzes *historical farming data, weather patterns, and soil quality*.  
- Uses *Random Forest Regression* to predict the expected yield.  
- *TensorFlow & Keras* optimize predictions based on real-time farming inputs.  

### *3️⃣ Crop Recommendation (Random Forest, TensorFlow)*  
- Recommends crops based on *regional conditions* and *soil data*.  
- Uses *Random Forest Classification* to determine the most profitable crops.  
- Incorporates *TensorFlow* for fine-tuning based on seasonal trends.  

### *4️⃣ AI Chatbot (Google Gemini API)*  
- Responds in *regional languages* to help farmers.  
- Uses *Natural Language Processing (NLP)* for real-time advice.  
- Supports *voice-based input and responses* for ease of use.  

---

## *Installation*  

To set up the project locally:  

### *1️⃣ Clone the Repository*  
bash
git clone https://github.com/sujaynsv/FarmWise.Ai.git  
cd FarmWise.AI/FarmWise.AI  


### *2️⃣ Backend Setup*  
- Create a virtual environment:  
bash
python3 -m venv venv  
source venv/bin/activate  

- Install dependencies:  
bash
pip install -r requirements.txt  


### *3️⃣ Frontend Setup*  
- Navigate to the frontend directory:  
bash
cd frontend  

- Install dependencies:  
bash
npm install  


### *4️⃣ Configure Environment Variables*  
- Set up API keys for:  
  ✅ *OpenWeather API* (Weather data)  
  ✅ *Google Gemini API* (Chatbot & NLP)  
  ✅ *Google Cloud Translation API* (Multilingual support)  

---

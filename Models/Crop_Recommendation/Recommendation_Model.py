from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt
from flask_cors import CORS
# Initialize Flask app
app = Flask(__name__)
CORS(app)
crop = pd.read_csv("Crop_recommendation.csv")
crop_dict = {
    'rice': 1, 'maize': 2, 'jute': 3, 'cotton': 4, 'coconut': 5, 'papaya': 6, 'orange': 7,
    'apple': 8, 'muskmelon': 9, 'watermelon': 10, 'grapes': 11, 'mango': 12, 'banana': 13,
    'pomegranate': 14, 'lentil': 15, 'blackgram': 16, 'mungbean': 17, 'mothbeans': 18,
    'pigeonpeas': 19, 'kidneybeans': 20, 'chickpea': 21, 'coffee': 22
}
crop['label'] = crop['label'].map(crop_dict)

# Features and target for crop recommendation
X_crop = crop.drop('label', axis=1)
y_crop = crop['label']

# Train-test split and scaling
X_train_crop, X_test_crop, y_train_crop, y_test_crop = train_test_split(X_crop, y_crop, test_size=0.2, random_state=42)
mx = MinMaxScaler()
sc = StandardScaler()
X_train_crop = sc.fit_transform(mx.fit_transform(X_train_crop))
X_test_crop = sc.transform(mx.transform(X_test_crop))

# Train crop recommendation model
randclf = RandomForestClassifier()
randclf.fit(X_train_crop, y_train_crop)


# Crop Recommendation Endpoint
@app.route('/recommend-crop', methods=['POST'])
def recommend_crop():
    data = request.json
    try:
        features = np.array(
            [[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]]
        )
        scaled_features = sc.transform(mx.transform(features))

        # Get probability estimates for each class
        probabilities = randclf.predict_proba(scaled_features)[0]

        # Get the indices of the top 3 crops
        top_3_indices = np.argsort(probabilities)[-3:][::-1]  # Sort and get top 3

        # Get crop names from dictionary
        top_3_crops = [crop for crop, code in crop_dict.items() if code in (top_3_indices + 1)]

        return jsonify({
            'prediction': top_3_crops,
            'accuracy': accuracy_score(y_test_crop, randclf.predict(X_test_crop))
        })
    except (ValueError, KeyError) as e:
        return jsonify({'error': 'Invalid input', 'message': str(e)}), 400


# Run Flask app
if __name__ == '__main__':
    app.run(debug=True,port=5004)

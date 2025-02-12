from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load and preprocess data
crop_data = pd.read_csv('crop_production.csv')
print(crop_data)
crop_data['Production'] = crop_data['Production'].fillna(crop_data['Production'].median())
crop_data['Yield'] = crop_data['Production'] / crop_data['Area']
print(crop_data.columns)
print(crop_data['Crop'].value_counts())
print(crop_data['Season'].unique())
# Clean the Season column
crop_data['Season'] = crop_data['Season'].str.strip()

# Define mappings for categorical columns
state_mapping = {state: idx for idx, state in enumerate(crop_data['State_Name'].unique())}
district_mapping = {district: idx for idx, district in enumerate(crop_data['District_Name'].unique())}
season_mapping = {season: idx for idx, season in enumerate(crop_data['Season'].unique())}
crop_mapping = {crop: idx for idx, crop in enumerate(crop_data['Crop'].unique())}

# Map categorical columns to numerical values
crop_data['State_Name'] = crop_data['State_Name'].map(state_mapping)
crop_data['District_Name'] = crop_data['District_Name'].map(district_mapping)
crop_data['Season'] = crop_data['Season'].map(season_mapping)
crop_data['Crop'] = crop_data['Crop'].map(crop_mapping)


def cap_outliers(series):
    lower_limit = series.quantile(0.01)
    upper_limit = series.quantile(0.99)
    return np.clip(series, lower_limit, upper_limit)

crop_data['Area'] = cap_outliers(crop_data['Area'])
crop_data['Yield'] = cap_outliers(crop_data['Yield'])
# Features and target
X = crop_data[['State_Name', 'District_Name', 'Crop_Year', 'Season', 'Crop', 'Area']]
y = crop_data['Yield']

# Train the model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Save the model

# Endpoint for predicting crop yield
@app.route('/predict-crop-yield', methods=['POST'])
def predict_crop_yield():
    data = request.json
    try:
        # Map input data to numerical values using the predefined mappings
        input_data = {
            'State_Name': state_mapping.get(data['State_Name']),
            'District_Name': district_mapping.get(data['District_Name']),
            'Crop_Year': int(data['Crop_Year']),
            'Season': season_mapping.get(data['Season'].strip()),  # Adjust as needed
            'Crop': crop_mapping.get(data['Crop']),
            'Area': float(data['Area'])
        }
        print(data['Season'])
        print(input_data['Season'])
        # Check for None values if mapping fails
        if None in input_data.values():
            return jsonify({
                'error': 'Prediction failed',
                'message': 'One or more fields contain invalid or unseen labels.'
            }), 400

        # Convert input data to DataFrame
        input_df = pd.DataFrame([input_data])

        # Predict yield
        predicted_yield = model.predict(input_df)[0]
        print(input_df)
        return jsonify({'predicted_yield': predicted_yield})

    except KeyError as e:
        return jsonify({'error': 'Invalid input data', 'message': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Prediction failed', 'message': str(e)}), 500


# Run Flask app
if __name__ == '__main__':
    app.run(debug=True,port=5001)

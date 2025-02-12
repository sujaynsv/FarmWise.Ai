from flask import Flask, request, jsonify
import tensorflow
import keras
import numpy as np
from PIL import Image
from flask_cors import CORS
import io
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppresses INFO and WARNING logs

app = Flask(__name__)
CORS(app)
# Load the pre-trained Keras model
model = keras.models.load_model("plant_disease_prediction_model.h5")
class_indices = {
    '0': 'Apple___Apple_scab',
    '1': 'Apple___Black_rot',
    '2': 'Apple___Cedar_apple_rust',
    '3': 'Apple___healthy',
    '4': 'Blueberry___healthy',
    '5': 'Cherry_(including_sour)___Powdery_mildew',
    '6': 'Cherry_(including_sour)___healthy',
    '7': 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    '8': 'Corn_(maize)___Common_rust_',
    '9': 'Corn_(maize)___Northern_Leaf_Blight',
    '10': 'Corn_(maize)___healthy',
    '11': 'Grape___Black_rot',
    '12': 'Grape___Esca_(Black_Measles)',
    '13': 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    '14': 'Grape___healthy',
    '15': 'Orange___Haunglongbing_(Citrus_greening)',
    '16': 'Peach___Bacterial_spot',
    '17': 'Peach___healthy',
    '18': 'Pepper,_bell___Bacterial_spot',
    '19': 'Pepper,_bell___healthy',
    '20': 'Potato___Early_blight',
    '21': 'Potato___Late_blight',
    '22': 'Potato___healthy',
    '23': 'Raspberry___healthy',
    '24': 'Soybean___healthy',
    '25': 'Squash___Powdery_mildew',
    '26': 'Strawberry___Leaf_scorch',
    '27': 'Strawberry___healthy',
    '28': 'Tomato___Bacterial_spot',
    '29': 'Tomato___Early_blight',
    '30': 'Tomato___Late_blight',
    '31': 'Tomato___Leaf_Mold',
    '32': 'Tomato___Septoria_leaf_spot',
    '33': 'Tomato___Spider_mites Two-spotted_spider_mite',
    '34': 'Tomato___Target_Spot',
    '35': 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    '36': 'Tomato___Tomato_mosaic_virus',
    '37': 'Tomato___healthy'
}
def prepare_image(img):
    # Resize the image to match model input
    img = img.resize((224, 224))
    img = np.array(img) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img
# Define a route to make predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the request
    file = request.files['file']
    prediction = 'Apple___Apple_scab'
    # Open and prepare the image
    img = Image.open(io.BytesIO(file.read()))
    prepared_img = prepare_image(img)

    # Make prediction
    prediction = model.predict(prepared_img)
    print(prediction)
    # Get the class index (highest probability)
    predicted_class = np.argmax(prediction, axis=1)[0]
    print(predicted_class)
    # Optionally map class index to class name
    class_name = class_indices[str(predicted_class)]
    print(class_name)
    return jsonify({'data': {'prediction': class_name}})
if __name__ == '__main__':
    app.run(debug=True,port=5003)
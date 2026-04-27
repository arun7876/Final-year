from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the model and metadata
model_path = 'disease_model.pkl'
encoder_path = 'label_encoder.pkl'
features_path = 'symptom_features.pkl'

model = None
le = None
symptom_features = None

try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        le = joblib.load(encoder_path)
        symptom_features = joblib.load(features_path)
        print("Models loaded successfully")
    else:
        print("Warning: Model files not found, but continuing...")
except Exception as e:
    print(f"Warning: Error loading models: {e}, but continuing...")

@app.route('/', methods=['GET'])
def home():
    return jsonify({'status': 'success', 'message': 'Flask backend is running'})

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or le is None or symptom_features is None:
        return jsonify({
            'status': 'error',
            'message': 'Models not loaded'
        }), 500
    
    try:
        data = request.json
        user_symptoms = data.get('symptoms', [])
        
        # Create input features (all 0s initially)
        input_data = {feature: 0 for feature in symptom_features}
        
        # Set 1 for symptoms provided by the user
        for symptom in user_symptoms:
            # Match strictly with the dataset's column names
            symptom_lower = symptom.lower().replace(" ", "_")
            if symptom_lower in input_data:
                input_data[symptom_lower] = 1
        
        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Predict
        prediction_encoded = model.predict(input_df)[0]
        prediction_disease = le.inverse_transform([prediction_encoded])[0]
        
        # Get probability (optional but good for UI)
        probabilities = model.predict_proba(input_df)[0]
        max_prob = np.max(probabilities)
        
        return jsonify({
            'disease': prediction_disease,
            'confidence': float(max_prob),
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

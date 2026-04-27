import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Load the dataset
dataset_path = 'synthetic_symptoms_dataset.csv'
if not os.path.exists(dataset_path):
    print(f"Error: Dataset not found at {dataset_path}")
    exit(1)

print("Loading dataset...")
df = pd.read_csv(dataset_path)

print(f"Dataset loaded. Shape: {df.shape}")
print("Preprocessing data...")
# Separate features and target
X = df.drop('target_disease', axis=1)
y = df['target_disease']

# Encode the target labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

print("Splitting data...")
# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

print("Training Random Forest model...")
# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print("Checking accuracy...")
# Check accuracy
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

print("Saving model and metadata...")
# Save the model and label encoder
joblib.dump(model, 'disease_model.pkl')
joblib.dump(le, 'label_encoder.pkl')
joblib.dump(list(X.columns), 'symptom_features.pkl')

print("Model and metadata saved successfully!")

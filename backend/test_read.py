import pandas as pd
import os
dataset_path = r'C:\Users\suraj\Desktop\synthetic_symptoms_dataset.csv'
print(f"Testing access to {dataset_path}...")
if os.path.exists(dataset_path):
    print("File exists. Attempting to read first 5 rows...")
    df = pd.read_csv(dataset_path, nrows=5)
    print("Read successful:")
    print(df)
else:
    print("File DOES NOT exist.")

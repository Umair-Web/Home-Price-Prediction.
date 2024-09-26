from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
import pickle
from pydantic import BaseModel
import pandas as pd

# Load the trained model from file
with open('linear_regression_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, for testing. You can specify your frontend domain here.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Define the input structure for the prediction request
class PredictionRequest(BaseModel):
    area: float
    bedrooms: int
    age: float

# Define a simple GET route for testing
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Define an API endpoint for predictions
@app.post("/predict")
def predict(request: PredictionRequest):
    # Extract feature values from the request
    feature_values = pd.DataFrame([[request.area, request.bedrooms, request.age]], columns=['area', 'bedrooms', 'age'])

    # Make a prediction using the trained model
    prediction = model.predict(feature_values)

    # Return the prediction result
    return {"prediction": prediction[0]}

# To run the app, use the command: uvicorn app:app --reload

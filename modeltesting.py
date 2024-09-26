import pickle
import numpy as np
import pandas as pd

# Load the saved model
with open('linear_regression_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Take user input for the features
try:
    area = float(input("Enter the area of the house in square feet: "))
    bedrooms = int(input("Enter the number of bedrooms: "))
    age = int(input("Enter the age of the house: "))

    # Format the input into a 2D array (as expected by the model)
    user_input = pd.DataFrame([[area, bedrooms, age]], columns=['area', 'bedrooms', 'age'])

    # Make the prediction
    predicted_price = model.predict(user_input)

    # Output the prediction result
    print(f"The predicted price of the house is: ${predicted_price[0]:,.2f}")

except ValueError:
    print("Invalid input! Please enter valid numbers for area, bedrooms, and age.")

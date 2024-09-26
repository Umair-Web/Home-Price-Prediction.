import pandas as pd
from sklearn.linear_model import LinearRegression #Importing Linear Regression class from scikit-learn.
from sklearn.model_selection import train_test_split#Importing function from scikit learn which will split data into training and testing sets.
import pickle #Pickel is used to serilalize object into file for later use.


# Load the home prices data


data = pd.read_csv('homeprices.csv')#This line loads data in pandas Dataframe.
print(data)


# Prepare features and target variable


X = data[['area', 'bedrooms', 'age']]#X are features for training and prediction,it selects three columns from dataframe.
y = data['price']#Y represents what we want to predict.


# Split the data into training and testing sets


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)#Test size 0.2 mean 20% data for testing 80% data for training.If no random_state is set, train_test_split randomly selects data for training and testing each time, leading to different results every time you run the code.


# Train the linear regression model


model = LinearRegression()
model.fit(X_train, y_train)



# Save the trained model using pickle


with open('linear_regression_model.pkl', 'wb') as f:#wb means to write it in binary mode.
    pickle.dump(model, f)

print("Model trained and saved as 'linear_regression_model.pkl'")

import React, { useState } from "react";

function App() {
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [age, setAge] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const fetchPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          area: parseFloat(area), 
          bedrooms: parseInt(bedrooms), 
          age: parseFloat(age) 
        }),
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Price Prediction</h1>
      <input
        type="number"
        value={area}
        onChange={(event) => handleInputChange(event, setArea)}
        placeholder="Enter area (sq ft)"
      />
      <input
        type="number"
        value={bedrooms}
        onChange={(event) => handleInputChange(event, setBedrooms)}
        placeholder="Enter number of bedrooms"
      />
      <input
        type="number"
        value={age}
        onChange={(event) => handleInputChange(event, setAge)}
        placeholder="Enter age of the home (years)"
      />
      <button onClick={fetchPrediction}>Predict</button>
      {prediction !== null && (
        <div>
          <h2>Predicted Price: ${prediction.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;

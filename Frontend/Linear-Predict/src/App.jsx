import React, { useState } from "react";
import img1 from "./assets/sample1.png"
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
    <div className="flex items-center justify-center  p-10 bg-[#fffded] h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" h-96 text-center " >
          <h1 className="text-5xl font-bold text-[#333]">Home Price Prediction</h1>
          <div className="flex flex-col gap-y-4 mt-7 items-center">
            <input
            className="w-2/3 p-3 bg-[#9AB899] text-[#333] font-semibold placeholder-[#333] "
              type="number"
              value={area}
              onChange={(event) => handleInputChange(event, setArea)}
              placeholder="Enter area (sq ft)"
              
            />
            <input
             className="w-2/3 p-3 bg-[#9AB899] text-[#333] font-semibold placeholder-[#333] "
              type="number"
              value={bedrooms}
              onChange={(event) => handleInputChange(event, setBedrooms)}
              placeholder="Enter number of bedrooms"
            />
            <input
             className="w-2/3 p-3 bg-[#9AB899] text-[#333] font-semibold placeholder-[#333] "
              type="number"
              value={age}
              onChange={(event) => handleInputChange(event, setAge)}
              placeholder="Enter age of the home (years)"
            />
          </div>

          <button onClick={fetchPrediction} className="bg-[#9AB899] px-3 py-2 mt-7">Predict</button>
          {prediction !== null && (
            <div>
              <h2 className="text-xl font-semibold text-[#333] mt-3">Predicted Price: ${prediction.toFixed(2)}</h2>
            </div>
          )}
        </div>

        <div className="h-96 flex justify-center mt-8">
          <img  src={img1} className="h-96 object-contain" alt="" />
        </div>
      </div>

    </div>

  );
}

export default App;

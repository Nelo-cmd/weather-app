import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [SubmittedCity, SetSubmittedCity] = useState("");

  useEffect(() => {
    const fetchWeatherData = () => {
      console.log("fetching Data...");
    };
  }, [SubmittedCity]);

  return (
    <>
      <div className="input_div">
        <input
          id="user_city"
          placeholder="enter your city"
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
        />
        <button value="Search" onSubmit={SetSubmittedCity(city)}></button>
      </div>
    </>
  );
}

export default App;

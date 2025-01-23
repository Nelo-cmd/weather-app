import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [SubmittedCity, SetSubmittedCity] = useState("");

  useEffect(() => {
    const fetchWeatherData = () => {
      console.log("fetching Data...");
      if (!SubmittedCity) {
        throw new error("Please input a city");
        return;
      }
      const API_KEY = "b74242ac8d01b6711e1f6bb0628cf56e";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${SubmittedCity}&appid=${API_KEY}`;
      try {
        const response = fetch(url);
        if (!response.ok) {
          return Error("city not found");
        }
        const data = response.json();
        console.log(data);
      } catch (error) {
        console.error("error fetching weather data:", error.message);
      }
    };
    fetchWeatherData();
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

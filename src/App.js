import React, { useState, useEffect } from "react";
import wind from "./images/winds-weather-symbol.png";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [SubmittedCity, SetSubmittedCity] = useState("");
  const [WeatherData, SetWeatherData] = useState(null);
  const [WeatherMain, SetWeatherMain] = useState("Clear");

  useEffect(() => {
    const backgroundStyles = {
      Clear: "linear-gradient(to right, #87CEEB, #FFD700)", // Clear skies
      Clouds: "linear-gradient(to right, #D3CCE3, #E9E4F0)", // Cloudy
      Rain: "linear-gradient(to right, #4A90E2, #6A1B9A)", // Rainy
      Drizzle: "linear-gradient(to right, #A1C4FD, #C2E9FB)", // Light drizzle
      Snow: "linear-gradient(to right, #E0F7FA, #81D4FA)", // Snowy
      Thunderstorm: "linear-gradient(to right, #373B44, #4286f4)", // Thunderstorm
      Mist: "linear-gradient(to right, #D9AFD9, #97D9E1)", // Mist
      Smoke: "linear-gradient(to right, #757F9A, #D7DDE8)", // Smoky
      Haze: "linear-gradient(to right, #FFEFBA, #FFFFFF)", // Hazy
      Dust: "linear-gradient(to right, #BA8B02, #181818)", // Dust
      Fog: "linear-gradient(to right, #757F9A, #D7DDE8)", // Foggy
      Sand: "linear-gradient(to right, #DECBA4, #3E5151)", // Sandy
      Ash: "linear-gradient(to right, #B79891, #94716B)", // Ash
      Squall: "linear-gradient(to right, #485563, #29323C)", // Squall
      Tornado: "linear-gradient(to right, #232526, #414345)", // Tornado
    };
    const background =
      backgroundStyles[WeatherMain] || backgroundStyles["Clear"];
    document.body.style.background = background;
    document.body.style.transition = "background 0.5s ease-in-out";
  }, [WeatherMain]);

  useEffect(() => {
    document.title = "Weather App";
  });
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!SubmittedCity) {
        return;
      }
      const API_KEY = "b74242ac8d01b6711e1f6bb0628cf56e";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${SubmittedCity}&appid=${API_KEY}&unit=metric`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("city not found");
        }
        const data = await response.json();
        console.log(data);
        SetWeatherData(data);
        SetWeatherMain(data.weather[0]?.main || "Clear");
      } catch (error) {
        console.error("error fetching weather data:", error.message);
      }
    };
    fetchWeatherData();
  }, [SubmittedCity]);
  if (!WeatherData) {
    return (
      <div className="app-div">
        <h2>GetWeather</h2>

        <div className="input_div">
          <input
            id="user_city"
            placeholder="enter your city"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
          />
          <button onClick={() => SetSubmittedCity(city)}>Set</button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="app-div">
        <h2>GetWeather</h2>
      </div>
      <div className="input_div">
        <input
          id="user_city"
          placeholder="enter your city"
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
        />
        <button onClick={() => SetSubmittedCity(city)}>Set</button>
      </div>
      <section className="section-1">
        <div className="box1">
          <h2 className="location">
            Right now in {WeatherData.name}
            {WeatherData.sys && WeatherData.sys.country
              ? `, ${WeatherData.sys.country}`
              : ""}
            ,
          </h2>
          <h2 className="datetime">
            {new Date(
              (WeatherData.dt + WeatherData.timezone) * 1000
            ).toLocaleString("en-UK", {
              timeZone: "UTC",
              year: "numeric",
              month: "long",
              weekday: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </h2>
        </div>
        <div className="box2">
          <img
            src={`https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`}
            alt="weather-icon"
            className="weather-icon"
          />
        </div>
        <div className="doublebox">
          <div className="box3">
            <h3 className="temp">
              {(WeatherData.main.temp - 273.15).toFixed(0)}
              °C
            </h3>
            <h3>
              Feels like {(WeatherData.main.feels_like - 273.15).toFixed(0)}°C
            </h3>
          </div>
          <div className="box3-5">
            <h5 className="clear">{WeatherData.weather[0].main}</h5>
            <h4>{WeatherData.weather[0].description}</h4>
          </div>
        </div>
        <div className="box4">
          <img src={wind} alt="wind icon"></img>
          <div>
            <h4>
              deg: {WeatherData.wind.deg}° <br></br>
              gust: {WeatherData.wind.gust}m/s
              <br></br>
              speed: {WeatherData.wind.speed}m/s
            </h4>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

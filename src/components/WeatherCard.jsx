import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "../styles/weatherCard.css";
import axios from "axios";
import LoadingSpinner  from './LoadingSpinner '
import sunnyGif from "../assets/weather_gif/sun.gif";
import rainyGif from "../assets/weather_gif/rain.gif";
import cloudyGif from "../assets/weather_gif/cloud.gif";
import tempGif from "../assets/weather_gif/hoticon.gif";
import windGif from "../assets/weather_gif/wind.gif";
function WeatherCard() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const apikey =import.meta.env.VITE_WEATHER_API_KEY;
  const apikey="b6a8a8aeec27d05d07b94e18880f963b"
  const handelSearch = async (cityName) => {
    if (!cityName) {
      alert("Enter City Name");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const weatherGif = (weatherCondition) => {
    const gifMap = {
      Clear: sunnyGif,
      Rain: rainyGif,
      Clouds: cloudyGif,
    };

    return gifMap[weatherCondition] || sunnyGif;
  };

  return (
    <div className="weatherCardContainer">
      <SearchBar search={handelSearch} />

      <div className="innerDivContainer">
        {loading && <div className="loadingdiv"><LoadingSpinner /></div>}
        {error && <div className="error-message">{error}</div>}
        {weatherData && !loading && !error && (
          <div className="weatherDetails">
            <div className="innerDetailContainer">
              <h2 className="city-name">{weatherData.name}</h2>
              <p className="weather-description">
                {weatherData.weather[0].description}
              </p>
              <div className="detail-row">
                <img src={tempGif} alt="Temp Icon" className="icon" />
                <p>{weatherData.main.temp}°C</p>
              </div>
              <div className="detail-row">
                <img src={tempGif} alt="Real Feel Icon" className="icon" />
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
              </div>
              <div className="detail-row">
                <img src={windGif} alt="Wind Icon" className="icon" />
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
            <div>
              <img
                src={weatherGif(weatherData.weather[0].main)}
                alt="Weather Condition"
                className="imagestyle"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;

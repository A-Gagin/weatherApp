// Functionality implemented:
    // Tell current weather
    // Hourly predictions for the next 2 days
    // Week-long daily forecast
    // User input for zip/city name
    // Allow for city name instead of zip code -NEXT STEP-
// Functionality needed:
    // Toggle between hourly and daily weather data
    // Translate unix timestamps to standard date/time
    // Add icons for each weather -NEXT STEP-

import React, { useState } from "react";
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";

const API_KEY = process.env.REACT_APP_api_key;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [zip, setZip] = useState(null);
  const [city, setCity] = useState(null);


  const makeForecast = (lat, long) => {
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("lon", long); 
    url.searchParams.append("lat", lat);
    url.searchParams.append("units", "imperial");
    url.searchParams.append("exclude", "current,minutely,alerts");
    console.log(url);
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        console.log("object", obj);
        if (obj !== []) {
          setForecast(obj);
          console.log("forecast", forecast)
        } else {
          setForecast(false);
        }
      });
    };

  const getWeather = () => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    if (city){
      url.searchParams.append("q", city);
    } else {
      url.searchParams.append("zip", zip); // insert a user zip here...
    }
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // also important to check html error codes
        // 200 means no errors
        if (obj.cod === 200) {
          setWeather(obj);
          console.log ("lat,lon ", obj.coord.lat, obj.coord.lon)
          makeForecast(obj.coord.lat, obj.coord.lon);
        } else {
          setWeather(false);
        }
      });
  };

  
  const handleZipSearch = (e) => {
    setZip(e.target.value);
  }
  
  const handleCitySearch = (e) => {
    setCity(e.target.value);
  }


  return (
    <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
      {/* <pre>{JSON.stringify(forecast, undefined, 4)}</pre> */}
      <input placeholder = "Search by Zip Code" onChange = {handleZipSearch}/>
      <button style = {{display: "flex", flexDirection: "row", alignItems: "center"}} onClick = {getWeather}>Get Weather</button>
      <input placeholder = "Search by City Name" onChange = {handleCitySearch}/>
      {console.log("Zip", zip, "city", city)}
      <button style = {{display: "flex", flexDirection: "row", alignItems: "center"}} onClick = {getWeather}>Get Weather</button>
      <div>
        <button>Daily Forecast</button>
        <button>Weekly Forecast</button>
      </div>

      <Current weather={weather} ></Current>
      {console.log (forecast.daily, forecast.hourly)}



      <Hourly forecast={forecast.hourly}></Hourly>
      <Daily forecast={forecast.daily}></Daily>
    </div>
  );
}
export default App;

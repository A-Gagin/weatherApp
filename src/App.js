// Functionality implemented:
    // Tell current weather
    // Hourly predictions for the next 2 days
    // Week-long daily forecast
    // User input for zip/city name
    // Allow for city name instead of zip code -NEXT STEP-
    // Toggle between hourly and daily weather data
// Functionality needed:
    // Translate unix timestamps to standard date/time
    // Add icons for each weather -NEXT STEP-
    // Make it look pretty lol

import React, { useState } from "react";
import Current from "./Current";
import Hourly from "./Hourly";
import Weekly from "./Weekly";

const API_KEY = process.env.REACT_APP_api_key;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [zip, setZip] = useState(null);
  const [city, setCity] = useState(null);
  const [hourly, setHourly] = useState(true);
  const [daily, setDaily] = useState(false);


  const makeForecast = (lat, long) => {
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("lon", long); 
    url.searchParams.append("lat", lat);
    url.searchParams.append("units", "imperial");
    url.searchParams.append("exclude", "current,minutely,alerts");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        if (obj !== []) {
          setForecast(obj);
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

  const getHourly = () =>{
    setHourly(true);
    setDaily(false);
  }

  const getDaily = () =>{
    setHourly(false);
    setDaily(true);
  }

  if (hourly){
      return (
        <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <input placeholder = "Search by Zip Code" onChange = {handleZipSearch}/>
        <input placeholder = "Search by City Name" onChange = {handleCitySearch}/> <br/>
        <button style = {{display: "flex", flexDirection: "row", alignItems: "center"}} onClick = {getWeather}>Get Weather</button>
  
        <Current weather={weather} ></Current>
  
  
        <div>
          <button onClick = {getHourly}>Hourly Forecast</button>
          <button onClick = {getDaily}>Weekly Forecast</button>
        </div>
  
        <Hourly forecast={forecast.hourly} displayToggle = {hourly}></Hourly>
        
        
      </div>
      )
  } else if (daily){
      return (
        <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <input placeholder = "Search by Zip Code" onChange = {handleZipSearch}/>
        <input placeholder = "Search by City Name" onChange = {handleCitySearch}/> <br/>
        <button style = {{display: "flex", flexDirection: "row", alignItems: "center"}} onClick = {getWeather}>Get Weather</button>

  
        <Current weather={weather} ></Current>
  
  
        <div>
          <button onClick = {getHourly}>Hourly Forecast</button>
          <button onClick = {getDaily}>Weekly Forecast</button>
        </div>

        <Weekly forecast={forecast.daily} displayToggle = {daily}></Weekly>
        
        
      </div>
      )
  } else {
      return (
        "Error"
      )
  }
}
export default App;

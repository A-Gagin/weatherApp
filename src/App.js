import React, { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_api_key;
function App() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("zip", 22904);
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
        } else {
          setWeather(false);
        }
      });
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <pre>{JSON.stringify(weather, undefined, 4)}</pre>
    </div>
  );
}
export default App;

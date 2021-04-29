import React, {  } from "react";
// need a state for daily and a state for weekly, for now let's just display both


function Current(weather){
    console.log ("weather", weather);
    
    if (weather.weather != null){ // check to make sure you're not trying to access things that are undefined
        return (
            <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1>Weather for: {weather.weather.name}</h1>


                <div>
                    <h2>Current Weather</h2>
                    {weather.weather.weather[0].description}
                    <br/>Current temperature: <br/>{weather.weather.main.temp} °F <br/>
                    Feels like: <br/> {weather.weather.main.feels_like} °F
                </div>
            </div>
            )
    }
    return(
        null
    )
}

export default Current;
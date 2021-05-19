import React, { } from "react";
import GetIcon from "./GetIcon";
import Typography from "@material-ui/core/Typography";

function Current({weather}) {
    if (weather !== null) { // check to make sure you're not trying to access things that are undefined
        return (
            <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <br />
                <br />
                <Typography variant="h3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>Weather for: {weather.name}</Typography>
                <br />

                <Typography variant="h4">Current Weather</Typography>
                <br/>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "dotted",
                    borderColor: "darkslategray",
                    borderRadius: "10px",
                    flexWrap: "wrap",
                    backgroundColor: "darkgray",
                    padding: "5px",
                    margin: "4px",
                    width: "auto"
                }}>

                    
                    <br />
                    {GetIcon(weather.weather[0].icon)}
                    {weather.weather[0].description}
                    <br />
                    {weather.main.temp} °F <br />
                    feels like:
                    {" " + weather.main.feels_like} °F
                </div>
            </div>
        )
    }
    return null;
}

export default Current;
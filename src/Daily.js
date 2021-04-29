import React, {} from "react";

function Daily (forecast){
    console.log("FORECAST in DAILY", forecast);
    if (forecast.forecast != null){
        return (
            <div>
                <h2>Daily Forecast</h2>
                <div>
                    {
                        forecast.forecast.map((day) => (
                            <div>
                                <h5>{day.dt}</h5>
                                {day.weather[0].description}<br/>
                                {"high: " + day.temp.max + " °F"}<br/>
                                {"low: " + day.temp.min + " °F"}
                            </div>

                        ))
                    }
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Daily;
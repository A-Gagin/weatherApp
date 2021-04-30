import React, {} from "react";

function Weekly (forecast, displayToggle){
    if (forecast.forecast != null && displayToggle){
        return (
            <div>
                <h2>Weekly Forecast</h2>
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

export default Weekly;
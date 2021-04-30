import React, {} from "react";

function Hourly (forecast, displayToggle){
    console.log("DISPLAY in HOURLY", displayToggle);
    if (forecast.forecast != null && displayToggle){
        return (
            <div>
                <h2>Hourly Forecast</h2>
                <div>
                    {
                        forecast.forecast.map((hour) => (
                            <div>
                                <h5>{hour.dt}</h5>
                                {hour.weather[0].description}<br/>
                                {hour.temp + " °F"}
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

export default Hourly;
import React from 'react';
import Weather from './Weather';
import Time from './Time';
import Score from './Score';

import '../style/weatherTime.css';

const WeatherTime = (props) => {
    return (
        <div className="row no-gutters WeatherTime">
            <div className="col col-sm-auto WTcontainer" style={{width: `${props.widthBar}`, transition: "width 2s", overflow: "hidden", borderRadius: "5px", background: "linear-gradient(rgba(248, 249, 250, 0.9), rgba(255, 255, 255, 0))"}}>
                <div className="row no-gutters">
                    <div className="col col-sm-10" style={{margin: "1rem auto", padding: "0.25rem", borderRadius: '0.25rem'}}> 
                        <form onSubmit={props.handleSubApi}>
                            <input 
                                type="text"
                                style={{display: "inline-block"}}
                                className="form-control"
                                name="inputForWeather" 
                                placeholder="Name of the city" 
                                aria-describedby="basic-addon1" 
                                value={props.inputCity}
                                onChange={props.handleWTInput} 
                                />
                        </form>
                    </div>
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>weather</em></h6></div>
                </div>
                <div className="row no-gutters">
                    <Weather 
                        city={props.weather[0]}
                        temp={props.weather[1]}
                        hum={props.weather[2]}
                        gen={props.weather[3]}
                    />
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>time</em></h6></div>
                </div>
                <div className="row no-gutters">
                    <Time 
                        time={props.time}
                    />
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>safety(max.10)</em></h6></div>
                </div>
                <div className="row no-gutters">
                    <Score 
                        score={props.cityScore}
                    />
                </div>
            </div>
            <div className="col col-sm-1 verticalBar" onClick={props.handleBarClick}>
                <h6 id="weatherAndTime">Weather&Time </h6>
            </div>
        </div>
    );
};

export default WeatherTime;
import React from 'react';
import Weather from './Weather';
import Time from './Time';
import Score from './Score';

import '../../style/weatherTime.css';

const WeatherTime = (props) => {
    console.log(props.data);    
    return (
            <div className="col col-sm-auto WTcontainer"
                style={{width: `${props.widthBar}`,
                borderTop: "0.1rem solid lightgray", 
                borderLeft: "0.1rem solid lightgray", 
                borderBottom: "0.1rem solid lightgray", 
                transition: "width 2s", 
                overflow: "hidden", 
                background: "rgba(248, 249, 250, 0.9)"}}
            >
                <div className="row no-gutters">
                    <div className="col col-sm-10" style={{margin: "1rem auto", padding: "0.25rem", borderRadius: '0.25rem'}}> 
                        <form onSubmit={props.handleSubApiWeather}>
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
                        data={props.data["0"]}
                    />
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>time</em></h6></div>
                </div>
                <div className="row no-gutters">
                    <Time 
                        time={props.data["time"]}
                    />
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>safety(max.10)</em></h6></div>
                </div>
                <div className="row no-gutters">
                    <Score 
                        score={props.data["cityRate"]}
                    />
                </div>
            </div>
        );
};

export default WeatherTime;
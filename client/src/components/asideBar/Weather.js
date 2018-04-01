import React from 'react';
import '../style/weather.css';

const Weather = (props) => {
    return (  
        <div className="col col-sm-10 weather" style={{borderBottom: "0.1rem solid lightgray", height: "8rem", textAlign: "center", margin: "0rem auto 1rem", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1)), url(${props.pic})`}} >
            <div className="row no-gutters cityName">
                <div className="col col-sm-12">
                    <h3 id="city" style={{margin: "0rem"}}>{props.city}</h3>
                </div>
            </div>
            <div className="row no-gutters cityTemp">
                <div className="col col-sm-12">
                    <h1 style={{margin: "0rem"}}>{props.temp}</h1>
                    <p style={{margin: "0rem"}}>{props.gen}</p>
                </div>
            </div>
        </div>
    );
};
 
export default Weather;


 
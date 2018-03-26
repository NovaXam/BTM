import React from 'react';
import './style/weather.css';

const Weather = (props) => {
    return (  
        <div className="weather" style={{height: "13rem", textAlign: "center", margin: "8rem 0.5rem", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1)), url(${props.pic})`}} >
            <div style={{paddingTop: "2em"}}>
                <h2>{props.city}</h2>
                <p>{props.gen}</p>
                <h1>{props.temp}</h1>
            </div>
        </div>
    )
}
 
export default Weather;



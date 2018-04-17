import React from 'react';
import '../../style/weather.css';

const Weather = (props) => {
    if (props.data !== undefined) {
    return (  
        <div className="col col-sm-10 weather" style={{borderBottom: "0.1rem solid lightgray", height: "8rem", textAlign: "center", margin: "0rem auto 1rem"}} >
            <div className="row no-gutters cityName">
                <div className="col col-sm-12">
                    <h3 id="city" style={{margin: "0rem"}}>{props.data[0]}</h3>
                </div>
            </div>
            <div className="row no-gutters cityTemp">
                <div className="col col-sm-12">
                    <h1 style={{margin: "0rem"}}>{props.data[1]}</h1>
                    <p style={{margin: "0rem"}}>{props.data[2]}</p>
                </div>
            </div>
        </div>
    );
    } else {
        return (
            <div className="col col-sm-10 weather" style={{borderBottom: "0.1rem solid lightgray", height: "8rem", textAlign: "center", margin: "0rem auto 1rem"}} >
                <div className="row no-gutters cityName">
                    <div className="col col-sm-12"></div>
                </div>
                <div className="row no-gutters cityTemp">
                    <div className="col col-sm-12"></div>
                </div>
            </div>
        )
    };
};
 
export default Weather;


 
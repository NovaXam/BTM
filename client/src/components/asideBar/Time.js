import React from 'react';

const Time = (props) => {
    return (
        <div className="col col-sm-10 time" style={{borderBottom: "0.1rem solid lightgray", height: "6rem", margin: "0rem auto 1rem", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1)), url(${props.pic})`}}>
            <h1>{props.time[1]}</h1>
            <p>{props.time[0]}</p>
        </div>
    );
}

export default Time;
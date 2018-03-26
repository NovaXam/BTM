import React from 'react';

const Time = (props) => {
    return (
        <div className="time" style={{height: "13rem", margin: "8rem 0.5rem", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1)), url(${props.pic})`}}>
            <div style={{paddingTop: "3em"}}>
                <h1>{props.time[1]}</h1>
                <p>{props.time[0]}</p>
            </div>
        </div>
    );
}

export default Time;
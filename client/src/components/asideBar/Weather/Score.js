import React from 'react';

const Time = (props) => {
    return (
        <div className="col col-sm-10 time" style={{height: "6rem", margin: "0rem auto 1rem", background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))`}}>
            <h1 style={{fontSize: "4rem"}}>{props.score} </h1>
        </div>
    );
}

export default Time;
import React from 'react';
import '../../style/time.css';

const Time = (props) => {
        return (
            <div className="col col-sm-10 time">
                <h1>{props.time[1]}</h1>
                <p>{props.time[0]}</p>
            </div>
        );
};

export default Time;
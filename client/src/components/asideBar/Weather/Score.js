import React from 'react';
import '../../style/score.css';

const Time = (props) => {
    return (
        <div className="col col-sm-10 score">
            <h1 style={{fontSize: "4rem"}}>{props.score} </h1>
        </div>
    );
}

export default Time;
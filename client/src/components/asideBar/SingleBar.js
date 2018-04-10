import React from 'react';
import '../style/singleBar.css';

const SingleBar = (props) => {
    return (
        <div className="row no-gutters barContainer" style={{borderLeft: props.data.barBorder}}> 
            <div id={props.id} className="col col-sm-12 verticalBar" style={{background: props.data.backColor}}>
                <h6 id={props.id}>{props.name}</h6>
            </div>
        </div>
    )
};

export default SingleBar;
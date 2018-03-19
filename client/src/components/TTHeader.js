import React from 'react';

const TTHeader = (props) => {
    return (
        <div className="col col-sm-4" style={{backgroundColor: props.back}}>
            <h3>{props.header}</h3>
        </div>
    )
};

export default TTHeader;
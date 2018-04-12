import React from 'react';
import '../../style/field.css';

const StaticFields = (props) => {
    return (
        <div className="row no-gutters field" style={{margin: "0rem 0rem 0rem", height: "3.5rem", overflowX: "auto"}}>
            <p className="col col-sm-12 temperature"><em>{props.fieldName}</em></p>
            <h5 id={props.id} className="col col-sm-12" value={props.data} style={{paddingRight: "1rem"}}>{props.data}</h5>
        </div>
        )
};

export default StaticFields;

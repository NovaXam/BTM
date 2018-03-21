import React from 'react';
import Entry from './Entry';

const TripList = (props) => {
    console.log(props);
    return (
        <div className="col col-sm-4" style={{overflow: "auto"}} onClick={props.val}>
            {props.data.map((elem, i) => {
                return <Entry key={i} id={i} elemDom={props.elemDom} entryData={elem} />
                })
            }
        </div>
    )
};

export default TripList;
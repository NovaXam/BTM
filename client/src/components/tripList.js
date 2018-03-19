import React from 'react';
import Entry from './Entry';

const TripList = (props) => {
    return (
        <div className="col col-sm-4" style={{overflow: "auto"}}>
            {props.data.map((elem, i) => {
                return <Entry key={i} entryData={elem} />
                })
            }
        </div>
    )
};

export default TripList;
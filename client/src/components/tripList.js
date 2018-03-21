import React from 'react';
import Entry from './Entry';

const TripList = (props) => {
    return (
        <div className="col col-sm-4" style={{overflow: "auto"}} onClick={props.val}>
            {props.data.map((elem, i) => {
                return <Entry key={i} id={elem.id} entryOpen={props.entryOpen} handleUpdateForm={props.handleUpdateForm} entryData={elem} />
                })
            }
        </div>
    )
};

export default TripList;
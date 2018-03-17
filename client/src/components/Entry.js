import React from 'react';

const Entry = (props) => {
    console.log(props);
    return (
        <div className="entry">
            {props.entryData.traveler} 
            {props.entryData.destination} <span></span>
            {props.entryData.date} 
        </div>
    );
}
export default Entry;
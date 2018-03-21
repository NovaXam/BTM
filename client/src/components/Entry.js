import React from 'react';

const Entry = (props) => {
    const type = {
        completed: "alert alert-warning",
        ongoing: "alert alert-success",
        upcoming: "alert alert-info"
    };
    var currentType = null;
    if (props.entryData.status == 0) { currentType = type.completed }
    else if (props.entryData.status == 1) { currentType = type.ongoing }
    else {currentType = type.upcoming};
    console.log(props);
    return (    
        <div className={currentType} id={props.id} role="alert" style={{lineHeight: "0.15rem", margin: "0 0.4rem 0.5rem 0.5rem"}}>
            <h4 className="alert-heading">{props.entryData.traveler} </h4>
            <p className="mb-0">{props.entryData.destination}</p>
            <hr />
            {props.entryData.date} 
        </div>
    );
        
}
export default Entry;
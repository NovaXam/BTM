import React from 'react';
import Scroll from 'react-scroll';

const SingleGraph = (props) => {
    return (  
            <div className="col col-sm-4" style={{height: "6rem"}}> 
                <button id={props.id} className="btn btn-light" style={{margin: "0.75rem", height: "90%", fontSize: "1.5rem", width: "15rem", borderRadius: "0.5rem", border: "none"}}>
                    {props.graphCathegoryname}
                </button>
            </div>
    )
};
 
export default SingleGraph;
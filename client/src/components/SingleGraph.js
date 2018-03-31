import React from 'react';
import Scroll from 'react-scroll';

const SingleGraph = (props) => {
    return (  
            <div className="col col-sm-2 mx-mb-4" style={{height: "6rem"}}> 
                <button id={props.id} className="btn btn-light" style={{margin: "0.3rem 0rem 0.3rem", height: "90%", fontSize: "120%", width: "100%", borderRadius: "0.5rem", border: "none", padding: "0.25rem"}}>
                    {props.graphCathegoryname}
                </button>
            </div>
    )
};
 
export default SingleGraph;
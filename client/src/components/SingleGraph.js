import React from 'react';
import Scroll from 'react-scroll';

const Element = Scroll.Element;

const SingleGraph = (props) => {
    return (  
            <div className="col col-sm-4"> 
        {/* <Element>        */}
                <div id={props.id} style={{margin: "0.5rem", height: "90%", borderRadius: "0.5rem", border: "0.05rem solid grey"}}>
                    singleGraphs
                </div>
        {/* </Element> */}
            </div>
    )
};
 
export default SingleGraph;
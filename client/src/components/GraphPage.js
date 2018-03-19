import React from 'react';
import Graph from './Graphics';
import react-graph from 'react-d3-basic';

const GraphPage = (props) => {
    console.log(props);
    return (
        <div className="graphContainer" style={{height: props.height, transition: "height 2s"}}>
            <Graph />
        </div>
    );
};

export default GraphPage;
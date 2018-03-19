import React, { Component } from 'react';
import SingleGraph from './SingleGraph';

import './style/graphs.css';

class Graps extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (  
            <div className="row justify-content-around no-gutters" style={{height: "8rem"}}>
                <SingleGraph />
                <SingleGraph />
                <SingleGraph />
            </div>
        )
    }
}
 
export default Graps;
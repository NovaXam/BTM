import React, { Component } from 'react';
import './style/graphs.css';

class Graps extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (  
            <div className="row no-gutters" style={{height: "8rem"}}>
                <div id="budget" className="col col-sm-4"> some </div>
                <div id="freq" className="col col-sm-4"> graphs </div>
                <div id="dest" className="col col-sm-4"> some </div>
            </div>
        )
    }
}
 
export default Graps;
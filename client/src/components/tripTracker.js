import React, { Component } from 'react';
import TripList from './tripList';

import './style/tripTracker.css';

class TripTracker extends Component {
constructor(props) {
    super(props);
    this.state = {
        
        }
    };

    render() {
        console.log(this.props);
        return (  
            <div className="tripTracker">    
                <div className="row no-gutters align-items-start justify-content-start" style={{height: "3rem"}}>
                    <div className="col col-sm-4" style={{backgroundColor: "#F5ED4E"}}>
                        <h2>Completed</h2>
                    </div>
                    <div className="col col-sm-4" style={{backgroundColor: "#57FF65"}}>
                        <h2>In progress</h2>
                    </div>
                    <div className="col col-sm-4" style={{backgroundColor: "#4FD9E0"}}>
                        <h2>Upcoming</h2>
                    </div>
                </div>
                <div className="row no-gutters" style={{height: "35rem"}}>
                    <TripList data={this.props.compEntries} />
                    <TripList data={this.props.inProgEntries} />
                    <TripList data={this.props.upComEntries} />
                </div>
            </div>
        );
    }
}
export default TripTracker;
 
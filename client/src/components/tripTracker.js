import React, { Component } from 'react';
import TripList from './tripList';
import TTHeader from './TTHeader';

import './style/tripTracker.css';

class TripTracker extends Component {
constructor(props) {
    super(props);
    this.state = {
        arr: [["COMPLETED", "#F5ED4E"], ["ONGOING", "#57FF65"], ["UPCOMING", "#4FD9E0"]]

        }
    };

    render() {
        return (  
            <div className="tripTracker">    
                <div className="row no-gutters align-items-start justify-content-start">
                    {
                        this.state.arr.map((elem, i) => {
                            return (
                            <TTHeader 
                                key={i}
                                header = {elem[0]}
                                back = {elem[1]} 
                            />
                            )
                        })
                    }
                </div>
                <div className="row no-gutters" style={{height: "27rem"}}>
                    <TripList data={this.props.compEntries} />
                    <TripList data={this.props.inProgEntries} />
                    <TripList data={this.props.upComEntries} />
                </div>
            </div>
        );
    }
}
export default TripTracker;
 
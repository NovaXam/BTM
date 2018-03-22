import React, { Component } from 'react';
import TripList from './tripList';
import TTHeader from './TTHeader';

import './style/tripTracker.css';

class TripTracker extends Component {
constructor(props) {
    super(props);
    this.state = {
        arr: [["COMPLETED", "#F5ED4E", "alert alert-warning"], ["ONGOING", "#57FF65", "alert alert-success"], ["UPCOMING", "#4FD9E0", "alert alert-info"]],
        };  
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
    };

    handleUpdateForm(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target);
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
                    <TripList 
                        data={this.props.compEntries}
                        type={this.state.arr[0][2]}
                        handleUpdateForm={this.handleUpdateForm}
                    />
                    <TripList 
                        data={this.props.inProgEntries}
                        type={this.state.arr[1][2]}
                        handleUpdateForm={this.handleUpdateForm}
                    />
                    <TripList 
                        data={this.props.upComEntries}
                        type={this.state.arr[2][2]}
                        handleUpdateForm={this.handleUpdateForm}
                    />
                </div>
            </div>
        );
    }
};

export default TripTracker;
 
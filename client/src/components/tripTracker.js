import React, { Component } from 'react';
import TripList from './tripList';
import TTHeader from './TTHeader';

import './style/tripTracker.css';

class TripTracker extends Component {
constructor(props) {
    super(props);
    this.state = {
        arr: [["COMPLETED", "#F5ED4E"], ["ONGOING", "#57FF65"], ["UPCOMING", "#4FD9E0"]],
        entryOpen: {
            rolled: false,
            id: null
            }
        };
        
        this.handleEntryListener = this.handleEntryListener.bind(this);
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
    };

    handleEntryListener(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.id);
        this.setState({
            entryOpen: {
                rolled: true,
                id: e.target.id[0]
            }
        });
    };

    handleUpdateForm(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.value);
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
                        type={this.state.arr[0][0]}
                        val={this.handleEntryListener}
                        entryOpen={this.state.entryOpen}
                        handleUpdateForm={this.handleUpdateForm}
                    />
                    <TripList 
                        data={this.props.inProgEntries}
                        type={this.state.arr[1][0]}
                        val={this.handleEntryListener}
                        entryOpen={this.state.entryOpen}
                        handleUpdateForm={this.handleUpdateForm}
                    />
                    <TripList 
                        data={this.props.upComEntries}
                        type={this.state.arr[2][0]}
                        val={this.handleEntryListener}
                        entryOpen={this.state.entryOpen}
                        handleUpdateForm={this.handleUpdateForm}
                    />
                </div>
            </div>
        );
    }
};

export default TripTracker;
 
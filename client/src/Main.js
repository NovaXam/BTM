import React, { Component } from 'react';
import './Main.css';

import Graphs from './components/Graphs';
import TripTracker from './components/tripTracker';
import AddNewTrip from './components/AddNewTrip';
import Weather from './components/Weather';
import Time from './components/Time';
import data from './dataStorage/trips';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compEntries: [],
      inProgEntries: [],
      upComEntries: []
    };
  }

  componentWillMount() {
    //in a final version of the app redirect a stream to DB using axios
    data.map((elem) => {
      console.log(elem);
      switch(elem.status){
         case 0: this.setState({compEntries: this.state.compEntries.concat(elem)});
         break;
         case 1: this.setState({inProgEntries: this.state.inProgEntries.concat(elem)});;
         break;
         case 2: this.setState({upComEntries: this.state.upComEntries.concat(elem)});;;
         break;
      };
  });
};

  render() {
    return (
      <div className="Main">
        <div className="container">
          <div id="top" className="row no-gutters justify-content-center">
            <div className="col-sm-8" style={{margin: "1rem"}}>
              <Graphs />
            </div>
          </div>
          <div id="middle" className="row no-gutters align-item-center">  
            <div className="col col-sm-2">
                  <Weather />
            </div>
            <div className="col col-sm-8">
              <TripTracker 
                    compEntries ={this.state.compEntries} 
                    inProgEntries ={this.state.inProgEntries} 
                    upComEntries ={this.state.upComEntries} 
              />
            </div>
            <div className="col col-sm-2 ">
              <Time />
            </div>
          </div>
          <div id="bottom" className="row no-gutters">
            <div className="col-sm">
              <AddNewTrip />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

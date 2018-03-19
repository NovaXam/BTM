import React, { Component } from 'react';
import axios from 'axios';

import './Main.css';

import Graphs from './components/Graphs';
import TripTracker from './components/tripTracker';
import AddNewTrip from './components/AddNewTrip';
import Weather from './components/Weather';
import Time from './components/Time';
import data from './dataStorage/trips';

const key = "673231bac3273ad544dce5bd054bbb9e";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compEntries: [],
      inProgEntries: [],
      upComEntries: [],
      inputCity: "",
      weather: [],
      time: [],
      pictureBack: ""
    };

    this.assignFunc = this.assignFunc.bind(this);
    this.selector = this.selector.bind(this);
    this.handleWTInput = this.handleWTInput.bind(this);
    this.handleSubApi = this.handleSubApi.bind(this);
  }

  async componentWillMount() {
    //in a final version of the app redirect a stream to DB using axios
    var temp = {
      tempArr1: [],
      tempArr2: [],
      tempArr3: []
    }
    try {
          const updatedState = await this.selector(data, temp);
          const assinger = await this.assignFunc(temp.tempArr1, temp.tempArr2, temp.tempArr3);
  } catch(err) {
    console.log(err);
  }
};

selector(arr, instance) {
  arr.map(function(elem) {
    switch(elem.status) {
      case 0: instance.tempArr1 = instance.tempArr1.concat(elem);
      break;
      case 1: instance.tempArr2 = instance.tempArr2.concat(elem);
      break;
      case 2: instance.tempArr3 = instance.tempArr3.concat(elem);
      break;
    };
  return instance;
});
}

assignFunc(elem1, elem2, elem3) {
  this.setState({
    compEntries: elem1,
    inProgEntries: elem2,
    upComEntries: elem3
  });
}

handleWTInput(e) {
  e.preventDefault();
  this.setState({
    inputCity: e.target.value

  });
};

handleSubApi(e) {
  e.preventDefault();
  
  const weather = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&units=metric&APPID=${key}`;
  const picture = `https://api.teleport.org/api/urban_areas/slug:${this.state.inputCity.toLowerCase()}/images/`;
  console.log(e.target.ref);
  Promise.all([axios(weather), axios(picture)]).then((res) => {
    this.setState({
      weather: [res[0].data.name, res[0].data.main.temp, res[0].data.main.humidity, res[0].data.weather[0].description],
      pictureBack: res[1].data.photos[0].image.mobile
    });
    const time = `http://api.geonames.org/timezoneJSON?lat=${res[0].data.coord.lat}&lng=${res[0].data.coord.lon}&username=novaxam`;
    axios(time)
    .then((data) => {
      const arr = data.data.time.split(" ");
      this.setState({
        time: arr
      })
    }) 
  })
  .catch((err) => {
    console.log(err);
  });
}

  render() {
    return (
      <div className="Main">
        <div className="container">
          <div id="top" className="row no-gutters justify-content-center">
            <div className="col-sm-9" style={{margin: "1rem"}}>
              <Graphs />
            </div>
          </div>
          <div id="middle" className="row no-gutters align-item-center">  
            <div className="col col-sm-2">
                  <Weather 
                      city={this.state.weather[0]}
                      temp={this.state.weather[1]}
                      hum={this.state.weather[2]}
                      gen={this.state.weather[3]}
                      pic={this.state.pictureBack}
                  />
            </div>
            <div className="col col-sm-8">
              <TripTracker 
                    compEntries ={this.state.compEntries} 
                    inProgEntries ={this.state.inProgEntries} 
                    upComEntries ={this.state.upComEntries} 
              />
            </div>
            <div className="col col-sm-2 ">
              <Time 
                  time={this.state.time}
                  pic={this.state.pictureBack}
              />
            </div>
          </div>
          <div id="bottom" className="row no-gutters">
            <div className="input-group mb-3 col col-sm-6" style={{marginTop: "1rem", margin: "1.5rem auto"}}> 
              <form style={{margin: "0 auto"}} onSubmit={this.handleSubApi}>
                <input 
                  type="text"
                  style={{width: "20rem"}}
                  className="form-control"
                  ref="weatime" 
                  placeholder="Type the name of the city" 
                  aria-describedby="basic-addon1" 
                  value={this.state.inputCity}
                  onChange={this.handleWTInput} />
                </form>
            </div>
            <hr id="line" />
            <div className="col col-sm-12">
              <AddNewTrip />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
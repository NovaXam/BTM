import React, { Component } from 'react';
import axios from 'axios';
import { key } from './assets/LocalStorage';

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
      inputCity: "",
      weather: [],
      time: [],
      pictureBack: "",
      dataFromDb: data
    };

    this.handleWTInput = this.handleWTInput.bind(this);
    this.handleSubApi = this.handleSubApi.bind(this);
    this.modifyData = this.modifyData.bind(this); 
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this. updateState = this.updateState.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  //feeding data from DB to a component
  async componentWillMount() {
};

async modifyData(elem) {
  try {
    if (typeof elem == "string") {
      const newList = await this.deleteItemFromList(elem);
      const newState = await this.updateState(newList);
   } else {
      const newList = await this.updateValue(elem);
      const newState = await this.updateState(newList);
   }
 } catch(err) {
    console.log(err);
  };
};

updateState(modifiedState) {
  this.setState({
    dataFromDb: modifiedState
  });
}

updateValue(updatedEntry) {
  var obj = this.state.dataFromDb;
  updatedEntry.id = parseInt(updatedEntry.id);
  updatedEntry.status = parseInt(updatedEntry.status);
  obj = obj.map((elem) => {
    if (elem.id == updatedEntry.id) {
      elem = {...updatedEntry}
     } else {
      };
      return elem;
    });
    return obj;
};


deleteItemFromList(data) {
  let newElem = parseInt(data);
  var obj = this.state.dataFromDb;
  const newList = obj.filter((item) => {
      return item.id !== newElem;
    });
  return newList;
};

componentWillReceiveProps() {
  this.setState({
    dataFromDb: data
  });
  console.log()
};

//method to catch an input value onSubmit on an API weather form field. 
handleWTInput(event) {
  event.stopPropagation();
  event.preventDefault();
  this.setState({
    inputCity: event.target.value
  });
};

//weather, time and picture API calls
handleSubApi(e) {
  e.preventDefault();
  e.stopPropagation();
  var picture = "";
  const weather = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&units=metric&APPID=${key.apiWeather}`;
  if (this.state.inputCity.split(" ").length > 1) {
    const newString = this.state.inputCity.split(" ").join("-").toLowerCase();
    console.log(newString);
    picture = `https://api.teleport.org/api/urban_areas/slug:${newString}/images/`;
  } else {
    picture = `https://api.teleport.org/api/urban_areas/slug:${this.state.inputCity.toLowerCase()}/images/`;
  };
  
  this.setState({
    inputCity: ""
  });

  Promise.all([axios(weather), axios(picture)]).then((res) => {
    this.setState({
      weather: [res[0].data.name, res[0].data.main.temp, res[0].data.main.humidity, res[0].data.weather[0].description],
      pictureBack: res[1].data.photos[0].image.mobile
    });
    const time = `http://api.geonames.org/timezoneJSON?lat=${res[0].data.coord.lat}&lng=${res[0].data.coord.lon}&username=${key.apiTime}`;
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

//main render lifecycle method
  render() {
    return (
      <div className="Main">
        <div className="container">
          <div id="top" className="row no-gutters justify-content-center">
            <div className="col-sm-9" style={{margin: "1rem"}}>
              <Graphs 
                  dataFromDb={this.state.dataFromDb}
              />
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
                    dataFromDb ={this.state.dataFromDb}
                    modifyData={this.modifyData}
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
                  name="inputForWeather"
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
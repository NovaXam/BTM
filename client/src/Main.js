import React, { Component } from 'react';
import axios from 'axios';
import { key } from './assets/LocalStorage';

import './components/style/main.css';

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
    this.updateState = this.updateState.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.tempObjAssing = this.tempObjAssing.bind(this);
  }

componentWillMount() {
  axios({
    method: 'GET',
    url: '/trips',
  })
  .then((res) => {
    if (res.data.length > 0) {
      var initialArrData = [];
      console.log(res);
      res.data.map((elem) => {
        let newTime = elem.time.slice(0, 10).split("-").reverse().join("-");
        let tempObj = {
            id: elem.id,  
            traveler: elem.traveler.employeeName,
            city: elem.city.cityName,
            budget: elem.budget.toString(),
            goal: elem.goal,  
            time: newTime,
            status: elem.status
          };
          initialArrData.push(tempObj);
        });
      this.setState({
        dataFromDb: this.state.dataFromDb.concat(initialArrData)
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

async modifyData(elem) {
  try {
    if (typeof elem === "string") {
      const newList = await this.deleteItemFromList(elem);
      const newState = await this.updateState(newList);
   } else {
      const newList = await this.updateValue(elem);
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
  updatedEntry.id = parseInt(updatedEntry.id);
  updatedEntry.status = parseInt(updatedEntry.status);
  axios({
    method: 'PATCH',
    url: `/trip/${updatedEntry.id}`,
    data: updatedEntry
  })
  .then((res) => {
    var updateEntryDB = this.tempObjAssing(res);
    var tempObj = this.state.dataFromDb;
    tempObj = tempObj.map((elem, i) => {
      return elem.id == updateEntryDB.id ? elem = updateEntryDB : elem;
    });
    this.setState({
      dataFromDb: tempObj
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

deleteItemFromList(data) {
  let newElem = parseInt(data);
  var obj = this.state.dataFromDb;
  axios({
    method: 'DELETE',
    url: `/trip/${newElem}`
   })
   .then((res) => {
     console.log(res);
   })
   .catch((err) => {
     console.log(err);
   });

  const newList = obj.filter((item) => {
      return item.id !== newElem;
    });
  return newList;
};

shouldComponentUpdate(nextProps, nextState) {
  return nextProps ? true : false;
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

addNewItem(item) {
  axios({
    method: 'POST',
    url: "/newtrip", 
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    responseType: 'json',
    responseEncoding: 'utf8',
    data: item
  })
  .then((res) => {
    var newObj = this.tempObjAssing(res);
    this.setState({
      dataFromDb: this.state.dataFromDb.concat(newObj)
    });
  })
  .catch((err) => {
    console.log(err);
  })
};

tempObjAssing(res) {
  var dateInString = res.data.time.slice(0,10).split("-").reverse().join("-");
  console.log(dateInString);
  var newObj = {
    id: res.data.id,
    traveler: res.data.traveler.employeeName,
    city: res.data.city.cityName,
    budget: res.data.budget,
    goal: res.data.goal,
    time: dateInString,
    status: res.data.status
  };
  console.log(newObj);
  return newObj;
}

//main render lifecycle method
  render() {
    console.log(this.state.dataFromDb);
    return (
      <div className="Main">
        <div className="container">
          <div id="top" className="row no-gutters">
            <div className="col col-sm-12">
              <Graphs 
                dataFromDb={this.state.dataFromDb}
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col col-sm-9">
              <div id="middle" className="row no-gutters">  
                <div className="col col-sm-2" style={{padding: "0"}}></div>
                  <div className="col col-sm-8" style={{padding: "0"}}>
                    <AddNewTrip 
                      addNewItem={this.addNewItem}
                      />
                  </div>
                  <div className="col col-sm-2" style={{padding: "0"}}></div>
                </div>
                
                <div className="row no-gutters">
                  <div className="col col-sm-12">
                    <TripTracker 
                      dataFromDb ={this.state.dataFromDb}
                      modifyData={this.modifyData}
                    />
                  </div>
                </div>
                <div id="bottom" className="row no-gutters">
                  <hr id="line" />
                  <div className="col col-sm-12"> 
                    <form style={{marginTop: "0.75rem"}} onSubmit={this.handleSubApi}>
                      <input 
                        type="text"
                        style={{width: "20rem", display: "inline-block"}}
                        className="form-control"
                        name="inputForWeather"
                        ref="weatime" 
                        placeholder="Type the name of the city" 
                        aria-describedby="basic-addon1" 
                        value={this.state.inputCity}
                        onChange={this.handleWTInput} />
                      </form>
                  </div>
                </div>
              </div>
            <div className="col col-sm-3"> 
              <Weather 
                city={this.state.weather[0]}
                temp={this.state.weather[1]}
                hum={this.state.weather[2]}
                gen={this.state.weather[3]}
                pic={this.state.pictureBack}
              />
              <Time 
                time={this.state.time}
                pic={this.state.pictureBack}
              />
            </div> 
            </div>
          </div>
        </div>
    );
  }
}

export default Main;
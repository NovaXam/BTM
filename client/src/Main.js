import React, { Component } from 'react';
import axios from 'axios';

import './components/style/main.css';

import Graphs from './components/Graphs';
import TripTracker from './components/tripTracker';
import AddNewTrip from './components/AddNewTrip';
import data from './dataStorage/trips';
import AsideBar from './components/asideBar/AsideBar';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromDbRough: [],
      dataFromDb: [],
      dataFromDbGraphs: [],
      profileTraveler: {},
      asideTrigger: false
    };

    this.modifyData = this.modifyData.bind(this); 
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.tempObjAssing = this.tempObjAssing.bind(this);
    this.handleCalendarEvent = this.handleCalendarEvent.bind(this);
    this.makeUpDataFromDb = this.makeUpDataFromDb.bind(this);
    this.handleClickForAsideBar = this.handleClickForAsideBar.bind(this);
    this.employeeProfileCalculator = this.employeeProfileCalculator.bind(this);
    this.erazeProfileFields = this.erazeProfileFields.bind(this);
    this.asideTriggerFromEntry = this.asideTriggerFromEntry.bind(this);
  }

componentWillMount() {
  const twelveMonth = new Date(Date.now() - (1000 * 60 * 60 * 24 * 30 * 12));
  let dataParams = {
    method: "POST",
    url: "/initial_graphs",
    data: twelveMonth
  };

  Promise.all([axios("/trips"), axios(dataParams)])
  .then((res) => {
    let dashBoardData = res[0].data;
    let graphsData = res[1].data;
    this.setState({
      dataFromDbRough: [...dashBoardData]
    });
    const dataReadyToFeedDashBoard = this.makeUpDataFromDb(dashBoardData);
    const dataReadyToFeedGrpahs = this.makeUpDataFromDb(graphsData);
    return {dataReadyToFeedDashBoard, dataReadyToFeedGrpahs};
  })
  .then((res) => {
    this.setState({
        dataFromDb: this.state.dataFromDb.concat(res.dataReadyToFeedDashBoard),
        dataFromDbGraphs: this.state.dataFromDbGraphs.concat(res.dataReadyToFeedGrpahs)
      });
  })
  .catch((err) => {
    console.log(err);
  });
};

makeUpDataFromDb(data) {
  if (data.length > 0) {
    var initialArrData = [];
    console.log(data);
    data.map((elem) => {
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
  };
  return initialArrData;
};

async modifyData(elem) {
  console.log(elem);
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

handleClickForAsideBar = async (data) => {
  try {
    const obj =  await this.state.dataFromDbRough.filter(elem => elem.id == data)[0];
    const employeeTipsObj = await this.state.dataFromDbRough.filter(elem => elem.traveler.employeeName == obj.traveler.employeeName);
    const createProfile = await this.employeeProfileCalculator(employeeTipsObj);
    const changeState = await this.setState({profileTraveler: {...createProfile}});
  } catch(err) {
    console.log(err);
  }
};

employeeProfileCalculator(data) {
  var profile = { 
    name: "",
    position: "",
    phone: "",
    email: "",
    budget: 0,
    travels: 0,
    cities: []
  };
  data.map((elem, i) => {
    if (i == 0) {
      profile.name = elem.traveler.employeeName;
      profile.position = elem.traveler.position;
      profile.phone = elem.traveler.email;
      profile.budget = elem.budget;
      profile.travels = data.length;
      profile.cities.push(elem.city.cityName);
    } else {
      profile.budget += elem.budget;
      profile.cities.push(elem.city.cityName);
    }
  });

  profile.cities = profile.cities.join(", ");
  profile.budget = profile.budget + " " + "USD"; 
  return profile;
};

erazeProfileFields() {
  console.log("eraze data");
  this.setState({
    profileTraveler: {
      name: "",
      position: "",
      phone: "",
      email: "",
      budget: null,
      travels: null,
      cities: []
    }
  })
};

asideTriggerFromEntry() {
  this.setState({
    asideTrigger: true
  });
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

//weather, time and picture API calls
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

handleCalendarEvent(dateRange) {
  console.log(dateRange);
  axios({
      method: 'POST',
      url: "/range_graphs",
      data: dateRange
  })
  .then((res) => {
      this.setState({
        dataFromDbGraphs: this.makeUpDataFromDb(res.data)
      })
  })
  .catch((err) => {
      console.log(err);
  });
};


//adjusting a data revieved from a server to an appropriate format for a dashboard
tempObjAssing(res) {
  console.log(res);
  var dateInString = res.data.time.slice(0,10).split("-").reverse().join("-");
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
    return (
      <div className="Main">
        <div className="container">
          <div id="top" className="row no-gutters">
            <div className="col col-sm-12">
              <Graphs 
                dataFromDbGraphs={this.state.dataFromDbGraphs}
                handleCalendarEvent={this.handleCalendarEvent}
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
                  <div className="col col-sm-2" style={{padding: "0"}}>
                  </div>
                </div>
                <div className="row no-gutters" style={{paddingRight: "0.5rem"}}>
                  <div className="col col-sm-12">
                    <TripTracker 
                      dataFromDb ={this.state.dataFromDb}
                      modifyData={this.modifyData}
                      handleClickForAsideBar={this.handleClickForAsideBar}
                      asideTrigger={this.asideTriggerFromEntry}
                    />
                  </div>
                </div>
                <div id="bottom" className="row no-gutters">
                  <hr id="line" style={{margin: "0.7rem auto 0rem"}} />
                </div>
              </div>
            <div className="col col-sm-3"> 
              <AsideBar 
                profileTraveler={this.state.profileTraveler}
                erazeProfileFields={this.erazeProfileFields}
                trigger={this.state.asideTrigger}
              />
            </div> 
            </div>
          </div>
        </div>
    );
  }
}

export default Main;
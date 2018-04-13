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
      asideTrigger: false,
      employeeProfileForDb: {},
      travelersList: [],
      initialFieldValueTraveler: false
    };

    this.modifyData = this.modifyData.bind(this); 
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.tempObjAssing = this.tempObjAssing.bind(this);
    this.handleCalendarEvent = this.handleCalendarEvent.bind(this);
    this.makeUpDataFromDb = this.makeUpDataFromDb.bind(this);
    this.handleClickForAsideBar = this.handleClickForAsideBar.bind(this);
    this.employeeProfileCalculator = this.employeeProfileCalculator.bind(this);
    this.erazeProfileFields = this.erazeProfileFields.bind(this);
    this.asideTriggerFromEntry = this.asideTriggerFromEntry.bind(this);
    this.updateTraveler = this.updateTraveler.bind(this);
    this.makeTravelerList = this.makeTravelerList.bind(this);
    this.handleTypeForTraveler = this.handleTypeForTraveler.bind(this);
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
    const travelersList = this.makeTravelerList(dashBoardData);
    const dataReadyToFeedGrpahs = this.makeUpDataFromDb(graphsData);
    return {dataReadyToFeedDashBoard, travelersList, dataReadyToFeedGrpahs};
  })
  .then((res) => {
    this.setState({
      dataFromDb: this.state.dataFromDb.concat(res.dataReadyToFeedDashBoard),
      dataFromDbGraphs: this.state.dataFromDbGraphs.concat(res.dataReadyToFeedGrpahs),
      travelersList: [...res.travelersList]
      });
  })
  .catch((err) => {
    console.log(err);
  });
};

makeTravelerList(data) {
  let arrTravalers = [];
  let map = {};
  data.map((elem, i) => {
    if (!map.hasOwnProperty(elem.traveler.employeeName)) {
      map[elem.traveler.employeeName] = elem.traveler.employeeName;
      arrTravalers.push({label: elem.traveler.employeeName});
    };
  });
  return arrTravalers;
};

makeUpDataFromDb(data) {
  if (data.length > 0) {
    var initialArrData = [];
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
      const newState = await this.updateState(newList.newDataFromDb);
      this.setState({
        dataFromDbRough: newList.tempDataFromDbRought
      })
   } else {
      const newList = await this.updateTrip(elem);
   }
 } catch(err) {
    console.log(err);
  };
};

handleClickForAsideBar = async (data) => {
  console.log(data);
  try {
    const obj =  await this.state.dataFromDbRough.filter(elem => elem.id == data)[0];
    const employeeTripsObj = await this.state.dataFromDbRough.filter(elem => elem.traveler.employeeName == obj.traveler.employeeName);
    this.setState({
      employeeProfileForDb: {...employeeTripsObj[0].traveler},
      initialFieldValueTraveler: true
    })
    const createProfile = await this.employeeProfileCalculator(employeeTripsObj);
    const changeState = await this.setState({profileTraveler: {...createProfile}});
  } catch(err) {
    console.log(err);
  }
};

handleTypeForTraveler = async (name) => {
  try {
    const employeeTripsObj = await this.state.dataFromDbRough.filter(elem => elem.traveler.employeeName == name);
    this.setState({
      employeeProfileForDb: {...employeeTripsObj[0].traveler},
      initialFieldValueTraveler: false
    })
    const createProfile = await this.employeeProfileCalculator(employeeTripsObj);
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
      profile.phone = elem.traveler.phone;
      profile.email = elem.traveler.email;
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
    },
    asideTrigger: false,
    initialFieldValueTraveler: true
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

updateTrip(updatedEntry) {
  updatedEntry.id = parseInt(updatedEntry.id);
  updatedEntry.status = parseInt(updatedEntry.status);
  axios({
    method: 'PATCH',
    url: `/trip/${updatedEntry.id}`,
    data: updatedEntry
  })
  .then((res) => {
    const tempDataFromDbRough = this.state.dataFromDbRough.map((elem, i) => {
      if (elem.id == res.data.id) {
        return elem = res.data;
      } else return elem;
    });
    const employeeTripsObj = tempDataFromDbRough.filter(elem => elem.traveler.employeeName == res.data.traveler.employeeName);
    const travelersList = this.makeTravelerList(tempDataFromDbRough);
    return {tempDataFromDbRough, employeeTripsObj, travelersList};
  })
  .then((value) => {
    const createProfile = this.employeeProfileCalculator(value.employeeTripsObj);
    this.setState({
      dataFromDbRough: [...value.tempDataFromDbRough],
      travelersList: [...value.travelersList]
    });
    const newDataFromDb = this.makeUpDataFromDb(value.tempDataFromDbRough);
    return {createProfile, newDataFromDb};
  })
  .then((result) => {
    this.setState({
      dataFromDb: result.newDataFromDb,
      profileTraveler: result.createProfile
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

deleteItemFromList(data) {
  let deletedElem = parseInt(data);
  var obj = this.state.dataFromDb;
  axios({
    method: 'DELETE',
    url: `/trip/${deletedElem}`
   })
   .then((res) => {
     console.log(res);
   })
   .catch((err) => {
     console.log(err);
   });
  const tempDataFromDbRought = [];
  const newDataFromDb = obj.filter((item, i) => {
    if (this.state.dataFromDbRough.id !== deletedElem) {
        tempDataFromDbRought.push(this.state.dataFromDbRough[i]);
        return item.id !== deletedElem;
      }
    });
  return {newDataFromDb, tempDataFromDbRought};
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
    console.log(res);
    this.setState({
      dataFromDbRough: this.state.dataFromDbRough.concat(res.data)
    });
  })
  .then(() => {
    this.setState({
      dataFromDb: this.makeUpDataFromDb(this.state.dataFromDbRough),
      travelersList: this.makeTravelerList(this.state.dataFromDbRough)
    });
  })
  .catch((err) => {
    console.log(err);
  })
};

updateTraveler(key, value) {
  let obj = {...this.state.employeeProfileForDb}
  delete obj.handler;
  delete obj.hibernateLazyInitializer;
  key == "name" ? obj["employeeName"] = value : obj[key] = value;
  axios({
    method: "PATCH",
    url: `/traveler/${obj.employee_id}`,
    data: obj
  })
  .then((res) => {
    let tempDataFromDbRough = this.state.dataFromDbRough.map((elem, i) => {
      if (elem.traveler.employee_id == res.data.employee_id) {
         elem.traveler = res.data;
         return elem;
      } else return elem;
    });
    
    let tempEmployeeProfileForDb = {...res.data};
    tempEmployeeProfileForDb["name"] = tempEmployeeProfileForDb["employeeName"];
    delete tempEmployeeProfileForDb.employeeName;
    
    let tempProfileTraveler = {...this.state.profileTraveler};
    tempProfileTraveler["name"] = tempEmployeeProfileForDb["name"];
    tempProfileTraveler["position"] = tempEmployeeProfileForDb["position"];
    tempProfileTraveler["phone"] = tempEmployeeProfileForDb["phone"];
    tempProfileTraveler["email"] = tempEmployeeProfileForDb["email"];
    
    this.setState({
      dataFromDbRough: tempDataFromDbRough,
      employeeProfileForDb: {...tempEmployeeProfileForDb},
      profileTraveler: {...tempProfileTraveler}
    });
    return this.makeUpDataFromDb(tempDataFromDbRough);
  })
  .then((res) => {
    this.setState({
      dataFromDb: [...res]
    });
  })
  .catch(err => console.log(err));
};

handleCalendarEvent(dateRange) {
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
                      asideTriggerPoint={this.asideTriggerFromEntry}
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
                updateTraveler={this.updateTraveler}
                travelersList={this.state.travelersList}
                handleTypeForTraveler={this.handleTypeForTraveler}
                initialFieldValueTraveler={this.state.initialFieldValueTraveler}
              />
            </div> 
            </div>
          </div>
        </div>
    );
  }
}

export default Main;
import React, { Component } from 'react';
import TripList from './tripList';
import TTHeader from './TTHeader';
import BottomBar from './bottomBar/BottomBar';

import './style/tripTracker.css';
import caretBottom from "../assets/caret-bottom-2x.png";
import caretTop from "../assets/caret-top-2x.png";

class TripTracker extends Component {
constructor(props) {
    super(props);
    this.state = {
        arr: [["COMPLETED", "#F5ED4E", "alert alert-warning"], ["ONGOING", "#57FF65", "alert alert-success"], ["UPCOMING", "#4FD9E0", "alert alert-info"]],
        cathegoryDataArr: [],
        itemDescClassIdValuepair: [[false, "0", "col col-sm-12 itemDescClose", caretBottom], [false, "1", "col col-sm-12 itemDescClose", caretBottom], [false, "2", "col col-sm-12 itemDescClose", caretBottom]],
        dashBoardColumn: []
    };
   
    this.selector = this.selector.bind(this);
    this.handleBottomBarOnClick=this.handleBottomBarOnClick.bind(this);
    this.classSwitch = this.classSwitch.bind(this);
    this.computeDataOutOfRow = this.computeDataOutOfRow.bind(this);
};

async componentWillMount() {
    var temp = {
        tempArr1: [],
        tempArr2: [],
        tempArr3: []
      }
      try {
            const updatedState = await this.selector(this.props.dataFromDb, temp);
    } catch(err) {
      console.log(err);
    }
};

//checking if data updated on the page 
async componentWillReceiveProps(nextProps) {
    var temp = {
        tempArr1: [],
        tempArr2: [],
        tempArr3: []
      }
      try {
            const updatedState = await this.selector(nextProps.dataFromDb, temp);
    } catch(err) {
      console.log(err);
    }
};

//building a temporary storage for a specific cathegory of a trip 
selector(arr, instance) {
    arr.map((elem) => {
      switch(elem.status) {
        case 0: instance.tempArr1 = instance.tempArr1.concat(elem);
        break;
        case 1: instance.tempArr2 = instance.tempArr2.concat(elem);
        break;
        case 2: instance.tempArr3 = instance.tempArr3.concat(elem);
        break;
        default: 
      };
      return instance;
  });
  this.setState({
        cathegoryDataArr: [instance.tempArr1, instance.tempArr2, instance.tempArr3]
    });
  };

  handleBottomBarOnClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let index = e.target.id;

    switch(index) {
        case "0": 
            this.classSwitch(index);
        break;
        case "1": 
            this.classSwitch(index);
        break;
        case "2": 
            this.classSwitch(index);
        default: false;
    }
  };

classSwitch(index) {
    let newItemDescClassIdValuepair = [...this.state.itemDescClassIdValuepair];
    let newdashBoardColumn = [...this.state.dashBoardColumn];
    if (!newItemDescClassIdValuepair[index][0]) {
        newItemDescClassIdValuepair[index][0] = true;
        newItemDescClassIdValuepair[index][2] = "col col-sm-12 itemDescOpen";
        newItemDescClassIdValuepair[index][3] = caretTop;
        newdashBoardColumn[index] = this.computeDataOutOfRow(index);
        console.log(newdashBoardColumn);
        this.setState({
            itemDescClassIdValuepair: newItemDescClassIdValuepair,
            dashBoardColumn: [...newdashBoardColumn]
        });
    } else {
        newItemDescClassIdValuepair[index][0] = false;
        newItemDescClassIdValuepair[index][2] = "col col-sm-12 itemDescClose";
        newItemDescClassIdValuepair[index][3] = caretBottom;
        newdashBoardColumn[index] = undefined;
        console.log(newdashBoardColumn);
        this.setState({
            itemDescClassIdValuepair: newItemDescClassIdValuepair,
            dashBoardColumn: [...newdashBoardColumn]
        });
    }
};

computeDataOutOfRow(index) {
    let tempObj = {
        "id": index,
        "Number of travel": 0,
        "Total budget": 0,
        "Number of person": 0,
        "Cities": []
    };
    let tempTraveler = {};
    let tempCities = {};
    tempObj["Number of travel"] = this.state.cathegoryDataArr[index].length;
    this.state.cathegoryDataArr[index].map((elem, i) => {
        tempObj["Total budget"] += parseInt(elem.budget);
        if(!tempTraveler.hasOwnProperty(elem.traveler)) {
            tempObj["Number of person"] += 1;
        };
        if(!tempCities.hasOwnProperty(elem.city)) {
            tempObj["Cities"] = tempObj["Cities"].concat(elem.city);
        };
    })
    tempObj["Cities"] = tempObj["Cities"].join(", ");
    return tempObj;  
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
            <div className="row no-gutters" style={{height: "28rem"}}>
                {
                    this.state.arr.map((comp, i) => {
                        return (
                            <TripList 
                                key={i}
                                data={this.state.cathegoryDataArr[i]}
                                type={comp}
                                handleUpdateForm={this.handleUpdateForm}
                                handleButtonForm={this.handleButtonForm}
                                modifyData={this.props.modifyData}
                                handleClickForAsideBar={this.props.handleClickForAsideBar}
                                asideTrigger={this.props.asideTriggerPoint}
                            />
                        )
                    })
                }
            </div>
            <div id="bottom" className="row no-gutters" onClick={this.handleBottomBarOnClick}>
                <hr id="line" style={{margin: "0.7rem auto 0rem"}} /> 
                    <BottomBar 
                        itemDescClassIdValuepair={this.state.itemDescClassIdValuepair}
                        dashBoardColumn={this.state.dashBoardColumn}
                    />
            </div>
        </div>
    )};
};
export default TripTracker;
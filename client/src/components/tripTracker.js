import React, { Component } from 'react';
import TripList from './tripList';
import TTHeader from './TTHeader';

import './style/tripTracker.css';

class TripTracker extends Component {
constructor(props) {
    super(props);
    this.state = {
        arr: [["COMPLETED", "#F5ED4E", "alert alert-warning"], ["ONGOING", "#57FF65", "alert alert-success"], ["UPCOMING", "#4FD9E0", "alert alert-info"]],
        cathegoryDataArr: []
    };
   
    this.selector = this.selector.bind(this);
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
      };
  });
  this.setState({
        cathegoryDataArr: [instance.tempArr1, instance.tempArr2, instance.tempArr3]
    });
  }
  
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
                            />
                        )
                    })
                }
            </div>
        </div>
    )};
};
export default TripTracker;
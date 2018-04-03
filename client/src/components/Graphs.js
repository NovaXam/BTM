import React, { Component } from 'react';
import Scroll from 'react-scroll';
import SingleGraph from './SingleGraph';

import './style/graphs.css';
import GraphPage from './GraphPage';

const scroller = Scroll.scroller;

class Graps extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            graphAreaState: "closedGrpahArea",
            cathegoryDataArrGraphs: [],
            hei: "0",
            singleGraphId: [0, 1, 2],
            name: "",
            data: [],
            dataType: [],
            height: "0",
            nameGraph: ["BUDGET", "HOW OFTEN", "WHERE TO"],
            openChart: "",
            widthGraph: null,
            heightGraph: null
        }
        this.handleSingleGraph = this.handleSingleGraph.bind(this);
        this.buildDataBudgetGraph = this.buildDataBudgetGraph.bind(this);
        this.buildDataFreqDurGraph = this.buildDataFreqDurGraph.bind(this);
        this.buildDataDestGraph = this.buildDataDestGraph.bind(this);
        this.closer = this.closer.bind(this);
        this.selectorGraphs = this.selectorGraphs.bind(this);
    };

    async componentWillMount() {
        var temp = {
            tempArr1: [],
            tempArr2: [],
            tempArr3: []
          }
          try {
                const updatedState = await this.selectorGraphs(this.props.dataFromDb, temp);
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
                const updatedState = await this.selectorGraphs(nextProps.dataFromDb, temp);
                const explisitelyRebootGraph = await this.rebuildGraph(this.state.openChart);
        } catch(err) {
          console.log(err);
        }
    };
        
    //building a temporary storage for a specific status of a trip 
    selectorGraphs(arr, instance) {
        arr.map(function(elem) {
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
            cathegoryDataArrGraphs: [instance.tempArr1, instance.tempArr2, instance.tempArr3]
        });
      }

    handleSingleGraph(e) {
        const value = this.state.cathegoryDataArrGraphs;
        switch(e.target.id) {
            case "0": 
                this.setState({
                    data: this.buildDataBudgetGraph(value),
                    name: "Budget",
                    dataType: ["money", "month"],
                    openChart: "0",
                    widthGraph: (window.innerWidth * 0.55),
                    heightGraph: ((window.innerWidth * 0.55) * 0.6)
                });
            break;
            case "1": 
                this.setState({
                    data: this.buildDataFreqDurGraph(value),
                    name: "Frequency",
                    dataType: ["number", "month"],
                    openChart: "1",
                    widthGraph: (window.innerWidth * 0.55),
                    heightGraph: ((window.innerWidth * 0.55) * 0.6)
                });
            break;
            case "2": 
                this.setState({
                    data: this.buildDataDestGraph(value),
                    name: "Destination",
                    dataType: [],
                    openChart: "2",
                    widthGraph: (window.innerWidth * 0.55),
                    heightGraph: ((window.innerWidth * 0.55) * 0.6)
                });
            break;
        }
        if (this.state.graphAreaState === "closedGrpahArea") {
            this.setState({
                graphAreaState: "openGrpahArea",
                height: ((window.innerWidth * 0.6) * 0.65),
                hei: "2.35rem",
                idChart: e.target.id
            });
            scroller.scrollTo(`${this.state.graphAreaState}`, {
                smooth: true,
            });
        }
    };

    rebuildGraph(graphType) {
        const value = this.state.cathegoryDataArrGraphs;
        switch(graphType) {
            case "0": 
                this.setState({
                    data: this.buildDataBudgetGraph(value),
                    name: "Budget",
                    dataType: ["money", "month"]
                });
            break;
            case "1": 
                this.setState({
                    data: this.buildDataFreqDurGraph(value),
                    name: "Frequency",
                    dataType: ["number", "month"]

                });
            break;
            case "2": 
                this.setState({
                    data: this.buildDataDestGraph(value),
                    name: "Destination",
                    dataType: []
                });
            break;
        };
    };

    closer() {
        this.setState({
            graphAreaState: "closedGrpahArea",
            height: "0rem",
            hei: "0rem",
        });
    }

    buildDataBudgetGraph(initInfo) {
        let finalArr = [];
        let map = {};
        let tempArr = [];
        initInfo.map((elem) => {
            elem.map((elem) => {
                let year = elem.time.split("-")[2];
                let index = parseInt(elem.time.split("-")[0]);
                let budget = parseInt(elem.budget);
                if(map[year] == undefined) {
                    tempArr = tempArr.concat(year);
                    var arrData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    map[year] = arrData;
                    map[year][index] += budget;
                } else {
                    map[year][index] += budget;
                };
            });
        });
        finalArr.push(map);
        finalArr.push(tempArr); 
        return finalArr;
    };

    buildDataFreqDurGraph(initInfo) {
        let finalArr = [];
        let map = {};
        let tempArr = [];
        initInfo.map((elem) => {
            elem.map((elem) => {
                let year = elem.time.split("-")[2];
                let index = parseInt(elem.time.split("-")[0]);
                let budget = parseInt(elem.budget);
                if(map[year] == undefined) {
                    tempArr = tempArr.concat(year);
                    var arrData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    map[year] = arrData;
                    map[year][index] += 1;
                } else {
                    map[year][index] += 1;
                };
            });
        });
        finalArr.push(map);
        finalArr.push(tempArr); 
        return finalArr;
    };

    buildDataDestGraph(initInfo) {
        let finalArr = [];
        let map = {};
        let tempArr = [];
        initInfo.map((elem) => {
            elem.map((elem) => {
                let year = elem.time.split("-")[2];
                let city = elem.city;
                if(map[year] == undefined) {
                    tempArr = tempArr.concat(year);
                    map[year] = {};
                    map[year][city] = 1;
                } else if (map[year][city] === undefined) {
                        map[year][city] = 1;
                } else {
                        map[year][city] += 1;
                    }
                });
            });
        finalArr.push(map);
        finalArr.push(tempArr);
        return finalArr;
    };

    render() {
        return (
                <div className={this.state.graphAreaState} >
                        <GraphPage 
                            data={this.state.data}
                            name={this.state.name}
                            dataType={this.state.dataType}
                            height={this.state.height}
                            widthGraph={this.state.widthGraph}
                            heightGraph={this.state.heightGraph}
                            closer={this.closer}
                        />
                    <div className="row justify-content-around no-gutters" style={{position: "relative"}} onClick={this.handleSingleGraph}>
                        {
                            this.state.singleGraphId.map((elem, i) => {
                                return <SingleGraph 
                                            key={i}
                                            id={i}
                                            graphCathegoryname={this.state.nameGraph[i]}
                                        />
                            })   
                        }
                    </div>
            </div>
        )
    }
};
 
export default Graps;
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
            buttonsAreaState: "8rem",
            singleGraphId: [0, 1, 2],
            data: [],
            name: "",
            dataType: [],
            height: "0rem"
        }
        this.handleSingleGraph = this.handleSingleGraph.bind(this);
        this.buildDataBudgetGraph = this.buildDataBudgetGraph.bind(this);
        this.buildDataFreqDurGraph = this.buildDataFreqDurGraph.bind(this);
        this.buildDataDestGraph = this.buildDataDestGraph.bind(this);
    };


    
    handleSingleGraph(e) {
        e.stopPropagation();
        e.preventDefault();
        const value = this.props["compEntries"];
        switch(e.target.id) {
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
        }
        if (this.state.graphAreaState === "closedGrpahArea") {
            this.setState({
                graphAreaState: "openGrpahArea",
                buttonsAreaState: "34rem",
                height: "32rem"
            });
        }
    };

    buildDataBudgetGraph(initInfo) {
        let finalArr = [];
        let map = {};
        let tempArr = [];
        initInfo.map((elem) => {
            let year = elem.date.split("-")[2];
            let index = parseInt(elem.date.split("-")[0]);
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
        finalArr.push(map);
        finalArr.push(tempArr); 
        return finalArr;
    };

    buildDataFreqDurGraph(initInfo) {
        let finalArr = [];
        let map = {};
        let tempArr = [];
        initInfo.map((elem) => {
            let year = elem.date.split("-")[2];
            let index = parseInt(elem.date.split("-")[0]);
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
        finalArr.push(map);
        finalArr.push(tempArr); 
        return finalArr;
    };

    buildDataDestGraph(initInfo) {
        let finalArr = [];
        let map = {};
        let tempArr = [];
        initInfo.map((elem) => {
            let year = elem.date.split("-")[2];
            let destination = elem.destination;
            if(map[year] == undefined) {
                tempArr = tempArr.concat(year);
                map[year] = {};
                map[year][destination] = 1;
            } else if (map[year][destination] === undefined) {
                    map[year][destination] = 1;
            } else {
                    map[year][destination] += 1;
                }
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
                />
                <div className="row justify-content-around no-gutters" style={{height: "8rem", top: this.state.buttonsAreaState, position: "sticky", transition: "top 2s"}} onClick={this.handleSingleGraph}>
                    {
                        this.state.singleGraphId.map((elem, i) => {
                            return <SingleGraph 
                                        key={i}
                                        id={elem}
                                    />
                        })   
                    }
                </div>
            </div>
        )
    }
}
 
export default Graps;
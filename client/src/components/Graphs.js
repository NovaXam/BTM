import React, { Component } from 'react';

import SingleGraph from './SingleGraph';
import GraphPage from './GraphPage';

import './style/graphs.css';

class Graps extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            graphAreaState: "closedGrpahArea",
            roughDataFromDB: [],
            hei: "0",
            singleGraphId: [0, 1, 2],
            name: "",
            data: [],
            dataType: [],
            height: "0",
            nameGraph: ["BUDGET", "HOW OFTEN", "WHERE TO"],
            openChart: "",
            widthGraph: null,
            heightGraph: null,
            months: [0, "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

        }
        this.handleSingleGraph = this.handleSingleGraph.bind(this);
        this.buildDataBudgetGraph = this.buildDataBudgetGraph.bind(this);
        this.buildDataFreqDurGraph = this.buildDataFreqDurGraph.bind(this);
        this.buildDataDestGraph = this.buildDataDestGraph.bind(this);
        this.closer = this.closer.bind(this);
        this.constructorFinalData = this.constructorFinalData.bind(this);
    };

    async componentWillReceiveProps(nextProps) {  
        try {
            const updateState = await this.setState({roughDataFromDB: nextProps.dataFromDbGraphs})
            const explisitelyRebootGraph = await this.rebuildGraph(this.state.openChart);
        } catch(err) {
          console.log(err);
        }
    };
      
    handleSingleGraph(e) {
        const value = this.state.roughDataFromDB;
        let width = 0;
        window.innerWidth !== 1920 ? width = (window.innerWidth * 0.55) : width = (window.innerWidth * 0.45)
        switch(e.target.id) {
            case "0": 
            this.setState({
                    data: this.buildDataBudgetGraph(value),
                    name: "Budget",
                    dataType: ["money", "month"],
                    openChart: "0",
                    widthGraph: width,
                    heightGraph: ((window.innerWidth * 0.55) * 0.6)
                });
            break;
            case "1": 
                this.setState({
                    data: this.buildDataFreqDurGraph(value),
                    name: "Frequency",
                    dataType: ["number", "month"],
                    openChart: "1",
                    widthGraph: width,
                    heightGraph: ((window.innerWidth * 0.55) * 0.6)
                });
            break;
            case "2": 
                this.setState({
                    data: this.buildDataDestGraph(value),
                    name: "Destination",
                    dataType: [],
                    openChart: "2",
                    widthGraph: width,
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
        }
    };

    //rebuild chart according to the user request of particular time scope. Invoked explicitely as a respond to user actions 
    rebuildGraph(graphType) {
        const value = this.state.roughDataFromDB;
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
    };

    constructorFinalData(data) {
        let finalArr = [];
        for(let elem in data) {
            finalArr.push({"x": elem, "y": data[elem]});
        };
        return finalArr;
    };

    //implicitely building charts with a scope of last 12 months as soon as a page is downloaded.
    async buildDataBudgetGraph(initInfo) {
        let container = {};
        try {
            const helperIterator = await initInfo.map((elem) => {
                let month = this.state.months[parseInt(elem.time.split("-")[1])];
                if (!container.hasOwnProperty(month)) {
                    container[month] = parseInt(elem.budget);
                } else {
                    container[month] += parseInt(elem.budget);
                };
            });
            const constructorFinalData = await this.constructorFinalData(container);
            const newState = await this.setState({data: constructorFinalData});
        } catch(err) {
            console.log(err);
        };
    };

    async buildDataFreqDurGraph(initInfo) {
        let container = {};
        try {
            const helperIterator = await initInfo.map((elem) => {
                let month = this.state.months[parseInt(elem.time.split("-")[1])];
                if (!container.hasOwnProperty(month)) {
                    container[month] = 1;
                } else {
                    container[month] += 1;
                };
            });
            const constructorFinalData = await this.constructorFinalData(container);
            const newState = await this.setState({data: constructorFinalData});
        } catch(err) {
            console.log(err);
        };
    };

    async buildDataDestGraph(initInfo) {
        let container = {};
        try {
            const helperIterator = await initInfo.map((elem) => {
                let city = elem.city;
                if (!container.hasOwnProperty(city)) {
                    container[city] = 1;
                } else {
                    container[city] += 1;
                };
            });
            const constructorFinalData = await this.constructorFinalData(container);
            const newState = await this.setState({data: constructorFinalData});
        } catch(err) {
            console.log(err);
        };
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
                            handleCalendarEvent={this.props.handleCalendarEvent}
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
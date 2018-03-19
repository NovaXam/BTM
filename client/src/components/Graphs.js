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
            singleGraphId: [0, 1, 2],
            data: []
        }
        this.handleSingleGraph = this.handleSingleGraph.bind(this);
        this.buildDataBudgetGraph = this.buildDataBudgetGraph.bind(this);
        this.buildDataFreqDurGraph = this.buildDataFreqDurGraph.bind(this);
        this.buildDataDestGraph = this.buildDataDestGraph.bind(this);
    };
    
    handleSingleGraph(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.target.id);
        switch(e.target.id) {
            case "0": 
                this.setState({
                    data: this.buildDataBudgetGraph(this.props["compEntries"])
                });
            break;
            case "1": 
                this.setState({
                    data: this.buildDataFreqDurGraph(this.props["inProgEntries"])
                });
            break;
            case "2": 
                this.setState({
                    data: this.buildDataDestGraph(this.props["upComEntries"])
                });
            break;
        }
        if (this.state.graphAreaState === "closedGrpahArea") {
            this.setState({
                graphAreaState: "openGrpahArea"
            });
        }
    };

    buildDataBudgetGraph(initInfo) {
        const arrData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            initInfo.map((elem) => {
            let index = parseInt(elem.date.split("-")[0]);
            let budget = parseInt(elem.budget);
            arrData[index] += budget;
        });
        return arrData;
    };

    buildDataFreqDurGraph(initInfo) {
        const arrData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            initInfo.map((elem) => {
            let index = parseInt(elem.date.split("-")[0]);
            arrData[index] += 1;
        });
        return arrData;
    };

    buildDataDestGraph(initInfo) {

    }

    render() { 
        console.log(this.state.data);
        return (
            <div id={this.state.graphAreaState} className="row justify-content-around no-gutters" style={{height: "8rem"}} onClick={this.handleSingleGraph}>
                {
                    this.state.singleGraphId.map((elem, i) => {
                        return <SingleGraph 
                                    key={i}
                                    id={elem}
                                />
                    })   
                }
                <GraphPage 
                    data={this.state.data}
                    name={this.state.name}
                    dataType={this.dataType}
                />
            </div>
        )
    }
}
 
export default Graps;
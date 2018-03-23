import React, {Component} from 'react';
import { BarChart, LineChart, PieChart } from "react-d3-components";
import Scroll from "react-scroll";

import './style/graphPages.css'; 

const Element = Scroll.Element;

class GraphPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    label: 'budget',
                    values: []
                }
            ],
            barAreaState: "barChartClose"
        };
        this.dataModify = this.dataModify.bind(this);
        this.handleCloseGraph = this.handleCloseGraph.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.data[0] !== undefined) {
            this.setState({
                data: Object.assign({}, this.dataModify(nextProps)),
                barAreaState: "barChartOpen"
            });
        }
    };

    dataModify(item) {
        const newData = [
            {
                label: "budget",
                values: []
            }
        ];
        if (item.name == "Destination") {
            if (Object.keys(item.data[0]).length > 0) {
                for (let elem in item.data[0]["2012"]) {
                    newData[0].values.push({x: elem, y: item.data[0]["2012"][elem]});
                }
            }
            newData[0].label = "Destination"; 
        } else {
            let data = item.data[0]["2012"];
            if (data.length > 0) {
                for (let i = 1; i < data.length; i++) {
                    newData[0].values.push({x: `${i}`, y: data[i]});
                };
            }
        }
        return newData;
    };

    handleCloseGraph(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.closer();
    }

   render() {
    switch(this.props.name) {
        case "Budget": 
            if (this.state.data[0].values.length > 0) {
                return (
                        <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                            <div style={{overflowY: "hidden", height: this.state.hei, transition: "height 2s", margin: "1rem 0rem 0rem 45rem"}}>
                                <button type="submit" className="btn btn-outline-info" onClick={this.handleCloseGraph}>X</button>
                            </div>
                            <BarChart  
                                data={this.state.data[0]}
                                width={700}
                                height={500}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                    );
                }
                else return (
                    <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                    </div>
                );
        break;
        case "Frequency": 
            if (this.state.data[0].values.length > 0) {
                return (
                        <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                            <div style={{overflowY: "hidden", height: this.state.hei, transition: "height 2s", margin: "1rem 0rem 0rem 45rem"}}>
                                <button type="submit" className="btn btn-outline-info" onClick={this.handleCloseGraph}>X</button>
                            </div>
                            <LineChart  
                                data={this.state.data[0]}
                                width={700}
                                height={500}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                    );
                }
                else return (
                    <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                    </div>
                );
            break;
        case "Destination": 
            var sort = null;    
            if (this.state.data[0].values.length > 0) {
                return (
                        <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                            <div style={{overflowY: "hidden", height: this.state.hei, transition: "height 2s", margin: "1rem 0rem 0rem 45rem"}}>
                                <button type="submit" className="btn btn-outline-info" onClick={this.handleCloseGraph}>X</button>
                            </div>
                            <PieChart  
                                data={this.state.data[0]}
                                width={700}
                                height={500}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                                sort={sort}
                            />
                        </div>
                    );
                }
                else return (
                    <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                    </div>
                );
            break;    
            default: 
            return (
                <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                </div>
            )    
        }
    }
};

export default GraphPage;
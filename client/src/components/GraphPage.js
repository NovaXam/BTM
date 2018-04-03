import React, {Component} from 'react';
import { BarChart, LineChart, PieChart } from "react-d3-components";
import Scroll from "react-scroll";
import Calendar from 'react-calendar';

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
            barAreaState: "barChartClose",
            range: true,
            calClass: "updatedCal",
            value: null
        };
        this.dataModify = this.dataModify.bind(this);
        this.handleCloseGraph = this.handleCloseGraph.bind(this);
        this.handleCalendarEvent = this.handleCalendarEvent.bind(this);
        this.handleSize = this.handleSize.bind(this);
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
    };

    handleCalendarEvent(date) {
        console.log(date);
    };

    handleSize(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
    }

   render() {
    switch(this.props.name) {
        case "Budget": 
            if (this.state.data[0].values.length > 0) {
                return (
                    <div className="row no-gutter graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem"}}>
                        <div className="col col-sm-3">
                            <div className="navBlock">
                                <Calendar 
                                    selectRange={this.state.range}
                                    className={this.state.updatedCal}
                                    value={this.state.value}
                                    onChange={this.handleCalendarEvent}
                                />
                            </div>
                        </div>
                        <div className="col col-sm-9">
                            <div className="row align-items-start" style={{overflowY: "hidden", height: this.state.hei, transition: "height 2s", textAlign: "right"}}>
                                <div className="col col-sm-12">
                                    <button type="submit" className="btn btn-outline-info" onClick={this.handleCloseGraph}>X</button>
                                </div>
                            </div>
                            <div className="row no-gutters justify-content-center" style={{margin: "0.5rem"}}>
                                <BarChart  
                                    data={this.state.data[0]}
                                    width={this.props.widthGraph}
                                    height={this.props.heightGraph}
                                    margin={{top: 10, bottom: 50, left: 50, right: 10}}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
            else return (
                <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflow: "hidden", marginTop: "1rem"}}>
                </div>
            );
        break;
        case "Frequency": 
            if (this.state.data[0].values.length > 0) {
                return (
                    <div className="row no-gutter graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem"}}>
                        <div className="col col-sm-3">
                            <div className="navBlock">
                                <Calendar 
                                    selectRange={this.state.range}
                                    className={this.state.updatedCal}
                                    value={this.state.value}
                                />
                            </div>
                        </div>
                        <div className="col col-sm-9">
                            <div className="row align-items-start" style={{overflowY: "hidden", height: this.state.hei, transition: "height 2s", textAlign: "right"}}>
                                <div className="col col-sm-12">
                                    <button type="submit" className="btn btn-outline-info" onClick={this.handleCloseGraph}>X</button>
                                </div>
                            </div>
                            <div className="row no-gutters justify-content-center" style={{margin: "0.5rem"}}>
                                <LineChart  
                                    data={this.state.data[0]}
                                    width={this.props.widthGraph}
                                    height={this.props.heightGraph}
                                    margin={{top: 10, bottom: 50, left: 50, right: 10}}
                                />
                            </div>
                        </div>
                    </div>
                );
            } else return (
                <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem"}}>
                </div>
            );
        break;
        case "Destination": 
            var sort = null;    
            if (this.state.data[0].values.length > 0) {
                return (
                    <div className="row no-gutter graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem"}}>
                        <div className="col col-sm-3">
                            <div className="navBlock">
                                <Calendar 
                                    selectRange={this.state.range}
                                    className={this.state.updatedCal}
                                    value={this.state.value}
                                />
                            </div>
                        </div>
                        <div className="col col-sm-9">
                            <div className="row align-items-start" style={{overflowY: "hidden", height: this.state.hei, transition: "height 2s", textAlign: "right"}}>
                                <div className="col col-sm-12">
                                    <button type="submit" className="btn btn-outline-info" onClick={this.handleCloseGraph}>X</button>
                                </div>
                            </div>
                        <div className="row no-gutters justify-content-center" style={{margin: "0.5rem"}}>    
                            <PieChart  
                                data={this.state.data[0]}
                                width={this.props.widthGraph}
                                height={this.props.heightGraph}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                                sort={sort}
                            />
                        </div>
                    </div>
                </div>
                );
            } else return (
                <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem"}}>
                </div>
            );
        break;    
        default: 
            return (
                <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", overflowX: "hidden", marginTop: "1rem"}}>
                </div>
            )    
        }
    }
};

export default GraphPage;
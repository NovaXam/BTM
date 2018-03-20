import React, {Component} from 'react';
import { BarChart } from "react-d3-components";
import Scroll from "react-scroll";

const Element = Scroll.Element;

class GraphPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    label: 'budget',
                    values: [{x: " " , y: 10}, {x: "e ", y: 4}, {x: 'SomethingC', y: 3}, {x: 'SomethiC', y: 13}, {x: 'SethingC', y: 8}]
                }
            ]
        };
    }
   render() {
    console.log(this.props.data[0]);
    if (this.props.data[0] !== undefined) {
        console.log(this.props.data[0]["2012"]);
    }
    return (
        <Element>
            <div className="graphContainer" style={{height: this.props.height, transition: "height 2s", position: "relative", overflowX: "hidden", marginTop: "1rem", borderBottom: "0.15rem solid lightgrey"}}>
                <BarChart  
                    data={this.state.data}
                    width={700}
                    height={500}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}}
                />
            </div>
        </Element>
        );
    }
};

export default GraphPage;
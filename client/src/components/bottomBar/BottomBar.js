import React, { Component } from 'react';

import BottomItem from './BottomItem';

class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ["Number of travel", "Total budget", "Number of person", "Cities"],
            data: this.props.dashBoardColumn
        }
    };

 render() {
    return (
        <div className="row no-gutters justify-content-center bottomBarRow"> 
            {
                this.props.itemDescClassIdValuepair.map((elem, i) => {
                    if (this.props.dashBoardColumn[i] !== undefined) {
                        return (
                            <BottomItem
                                id={elem[1]}
                                itemDescClassValue={elem[2]}
                                caretBottom={elem[3]}
                                key={i}
                                name={this.state.name}
                                data={this.state.data}
                                dashBoardColumn={this.props.dashBoardColumn[i]}
                            />
                        )
                    } else {
                        return (
                            <BottomItem
                                id={elem[1]}
                                itemDescClassValue={elem[2]}
                                caretBottom={elem[3]}
                                key={i}
                                name={this.state.name}
                                data={this.state.data}
                            />
                        )
                    }
                })
            }
        </div>
        )
    }
};

export default BottomBar;


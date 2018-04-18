import React from 'react';
import {Element} from "react-scroll";

import Entry from './Entry';

import './style/tripList.css';




class TripList extends React.Component {
    render() {
        return (
            <Element className="col col-sm-4 tripList" id="containerElement">
                {this.props.data.map((elem, i) => {
                    return <Entry
                            key={i}
                            type={this.props.type}
                            entryData={elem}
                            modifyData={this.props.modifyData}
                            handleClickForAsideBar={this.props.handleClickForAsideBar}
                            asideTrigger={this.props.asideTrigger}
                        />
                    })
                }
            </Element>
        )
    };
}

export default TripList;
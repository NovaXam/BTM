import React from 'react';
import Entry from './Entry';
import './style/tripList.css';

class TripList extends React.Component {
    render() {
        return (
            <div className="col col-sm-4 tripList">
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
            </div>
        )
    };
}

export default TripList;
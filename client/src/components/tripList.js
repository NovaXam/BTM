import React from 'react';
import Entry from './Entry';

// const TripList = (props) => {
//     return (
//         <div className="col col-sm-4" style={{overflow: "auto"}}>
//             {props.data.map((elem, i) => {
//                 return <Entry 
//                         key={i}
//                         type={props.type}
//                         entryData={elem}
//                         modifyData={props.modifyData}
//                     />
//                 })
//             }
//         </div>
//     )
// };

class TripList extends React.Component {
    render(){

    return (
        <div className="col col-sm-4" style={{overflow: "auto"}}>
            {this.props.data.map((elem, i) => {
                return <Entry 
                        key={i}
                        type={this.props.type}
                        entryData={elem}
                        modifyData={this.props.modifyData}
                    />
                })
            }
        </div>
    )
};
}

export default TripList;
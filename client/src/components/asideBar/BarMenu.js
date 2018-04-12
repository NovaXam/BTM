import React from 'react';
import SingleBar from './SingleBar';

const BarMenu = (props) => {
    return (
        <div className="col col-sm-2" onClick={props.handleBarClick}>
            {props.barAttributes.map((elem, i) => {
                    return ( 
                        <SingleBar
                            name={props.barName[i]}
                            data={elem}
                            id={i}
                            key={i * Math.random()}
                        />
                    )
                })
            }
        </div>
    )
};

export default BarMenu;
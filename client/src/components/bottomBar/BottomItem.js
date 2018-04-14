import React from 'react';

import StatciField from '../asideBar/Traveler/StaticFields';

import '../style/bottomItem.css';

const BottomItem = (props) => {
    if (props.dashBoardColumn !== undefined) {
        return (
            <div className="col col-sm-4 item"> 
                <div className="row no-gutters">
                    <div className={props.itemDescClassValue}>
                        {
                            props.name.map((elem, i) => {
                                return (
                                    <StatciField 
                                        fieldName={elem}
                                        data={props.dashBoardColumn[elem]}
                                        key={i}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row no-gutters itemSwitch">
                    <div id={props.id} className="col col-sm-12">
                        <span><img src={props.caretBottom} /></span>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="col col-sm-4 item"> 
                <div className="row no-gutters">
                    <div className={props.itemDescClassValue}>
                    </div>
                </div>
                <div className="row no-gutters itemSwitch">
                    <div id={props.id} className="col col-sm-12">
                        <span><img src={props.caretBottom} /></span>
                    </div>
                </div>
            </div>
        )
    }
};

export default BottomItem;
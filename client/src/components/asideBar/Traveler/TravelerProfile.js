import React from 'react';
import Field from './Field';

const TravelerProfile = (props) => {
    let vals = Object.values(props.profileTraveler);
    let keys = Object.keys(props.profileTraveler);
    return (
        <div className="col col-sm-auto WTcontainer"
                style={{width: `${props.widthBar}`,
                borderTop: "0.1rem solid lightgray",
                borderLeft: "0.1rem solid lightgray",
                borderBottom: "0.1rem solid lightgray",
                transition: "width 2s",
                overflow: "hidden",
                background: "linear-gradient(rgba(248, 249, 250, 0.9), rgba(255, 255, 255, 0))"}}
            >
                <div className="row no-gutters">
                    <div className="col col-sm-10" style={{margin: "1rem auto", padding: "0.25rem", borderRadius: '0.25rem'}}>
                        <form onSubmit={props.handleSubTraveler}>
                            <input
                                type="text"
                                style={{display: "inline-block"}}
                                className="form-control"
                                name="inputForWeather" 
                                placeholder="Name of the city" 
                                aria-describedby="basic-addon1" 
                                value={props.inputCity}
                                onChange={props.handleWTInput} 
                            />
                        </form>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col col-sm-12">
                    {
                        keys.map((elem, i) => {
                            return (
                                < Field
                                    fieldName={elem}
                                    data={vals[i]}
                                    key={i * Math.random()}
                                    id={++i * Math.random() / i }
                                    updateTraveler={props.updateTraveler}

                                    
                                />
                            )
                        })
                    }
                    </div>
                </div>
        </div>
    )
};

export default TravelerProfile;
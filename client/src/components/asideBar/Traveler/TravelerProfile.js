import React from 'react';

const TravelerProfile = (props) => {
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
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>new param</em></h6></div>
                </div>
                <div className="row no-gutters" style={{height: "4.75rem"}}>
                    {/* insert component */}
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>new param</em></h6></div>
                </div>
                <div className="row no-gutters" style={{height: "4.75rem"}}>
                    {/* insert component */}
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>new param</em></h6></div>
                </div>
                <div className="row no-gutters" style={{height: "4.75rem"}}>
                    {/* insert component */}
                </div>
                <div className="row no-gutters" style={{margin: "0rem 0rem 0rem", height: "4.75rem"}}>
                    <div className="col col-sm-12 temperature"><h6 style={{margin: "0rem"}}><em>new param</em></h6></div>
                </div>
                <div className="row no-gutters">
                    {/* insert component */}
                </div>
        </div>
    )
};

export default TravelerProfile;
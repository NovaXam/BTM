import React from 'react';

const EntryContent = (props) => {
    // console.log(props);
    if (props.status == "entryOpened") {
        return (
        <div>
            <button type="submit" className="btn btn-outline-info btn-sm" style={{marginLeft: "11rem", display: "inline-block", border: "none"}} onClick={props.handleCloseForm}>X</button>
            <form onSubmit={props.handleUpdateForm}> 
                <div className="form-group" >
                    <label>Name</label>
                        <input
                            type="text" 
                            name="name"
                            className="form-control" 
                            value={props.localData.traveler}
                            onChange={props.handleFilling}
                        />
                </div>
                <div className="form-group">
                    <label>Destination</label>
                        <input 
                            type="text" 
                            name="destination"
                            className="form-control" 
                            value={props.localData.destination}
                            onChange={props.handleFilling}
                        />
                </div>
                <div className="form-group">
                    <label>Date</label>
                        <input 
                            type="text" 
                            name="date"
                            className="form-control"
                            value={props.localData.date}
                            onChange={props.handleFilling}        
                        />
                </div>
                <div className="form-group">
                    <label>Budget</label>
                        <input 
                            type="text" 
                            name="budget"
                            className="form-control"
                            value={props.localData.budget}
                            onChange={props.handleFilling}          
                        />
                </div>
                <div className="form-group">
                    <label>Goal</label>
                        <input 
                            type="text"
                            name="goal"
                            className="form-control"
                            value={props.localData.goal}
                            onChange={props.handleFilling}
                        />
                </div>
                <hr />
                <button type="submit" className="btn btn-light btn-sm" style={{marginRight: "1rem"}}>Delete</button>
                <button type="submit" className="btn btn-info btn-sm" style={{marginLeft: "1rem"}} >Save</button>
            </form>
        </div>
        );
    }
    else {
        return (
            <div style={{padding: "0.5rem 0rem"}} onClick={props.handleRollerAndContent}>
                {props.localData.traveler}
                <hr />
                {props.localData.destination}
                <hr />
                {props.localData.date} 
            </div>
        )
    }
};

export default EntryContent;
import React from 'react';

const EntryContent = (props) => {
    if (props.statusView == "entryOpenedToEdit") {
        return (
        <div>
            <button type="submit" className="btn btn-outline-info btn-sm" style={{display: "inline-block", border: "none"}} onClick={props.handleCloseForm}>X</button>
            <form onSubmit={props.handleUpdateForm}> 
                <input
                        type="hidden" 
                        name="id"
                        className="form-control" 
                        value={props.id}
                        />
                <div className="form-group" >
                        <input
                            type="text" 
                            name="traveler"
                            className="form-control" 
                            value={props.localData.traveler}
                            onChange={props.handleFilling}
                        />
                </div>
                <div className="form-group">
                        <input 
                            type="text" 
                            name="destination"
                            className="form-control" 
                            value={props.localData.destination}
                            onChange={props.handleFilling}
                        />
                </div>
                <div className="form-group">
                        <input 
                            type="text" 
                            name="date"
                            className="form-control"
                            value={props.localData.date}
                            onChange={props.handleFilling}        
                        />
                </div>
                <div className="form-group">
                        <input 
                            type="text" 
                            name="budget"
                            className="form-control"
                            value={props.localData.budget}
                            onChange={props.handleFilling}          
                        />
                </div>
                <div className="form-group">
                        <input 
                            type="text"
                            name="goal"
                            className="form-control"
                            value={props.localData.goal}
                            onChange={props.handleFilling}
                        />
                </div>
                <hr />
                <button id={props.id} status={props.localData.status} className="btn btn-light btn-sm" style={{marginRight: "1rem"}} onClick={props.handleButtonForm}>Delete</button>
                <button type="submit" name="save" className="btn btn-info btn-sm" style={{marginLeft: "1rem"}} >Save</button>
            </form>
        </div>
        );
    } else if (props.statusView == "entryOpenedToExtendView") {
        return (
            <div style={{padding: "0rem 0rem"}}>
                <button type="submit" className="btn btn-outline-info btn-sm" style={{display: "inline-block", border: "none"}} onClick={props.handleCloseForm}>X</button>
                <p></p>
                {props.localData.traveler}
                <hr />
                {props.localData.destination}
                <hr />
                {props.localData.budget} 
                <hr />
                {props.localData.date} 
                <hr />
                {props.localData.goal} 
                <hr />
                <button type="submit" className="btn btn-light btn-sm" style={{marginRight: "1rem"}} onClick={props.handleRollerView}>Edit</button>
            </div>
        );
    } else {
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
import React from 'react';
import './style/entryContent.css';

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
                    value={props.localData.id}
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
                        name="city"
                        className="form-control" 
                        value={props.localData.city}
                        onChange={props.handleFilling}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="time"
                        className="form-control"
                        value={props.localData.time}
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
                <div className="form-group">
                    <select 
                        className="form-control" 
                        name="status"
                        value={props.localData.status}
                        onChange={props.handleFilling}
                    >
                        <option>choose a trip status</option>
                        <option>completed</option>
                        <option>ongoing</option>
                        <option>upcoming</option>
                    </select>
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
                {/* <p></p> */}
                <h6>{props.localData.traveler}</h6>
                <hr />
                <h6>{props.localData.city}</h6>
                <hr />
                <h6>{props.localData.budget} USD</h6>
                <hr />
                <h6>{props.localData.time.toString()}</h6>
                <hr />
                <h6>{props.localData.goal}</h6>
                <hr />
                <button type="submit" className="btn btn-light btn-sm" onClick={props.handleRollerView}>Edit</button>
            </div>
        );
    } else {
        return (
            <div id={props.id} className="singleEntry" onClick={props.handleRollerAndContent}>
                <h6 id={props.id}> {props.localData.traveler}</h6>
                <hr />
                <h6 id={props.id}> {props.localData.city}</h6>
                <hr />
                <h6 id={props.id}> {props.localData.time.toString()}</h6>
            </div>
        )
    }
};

export default EntryContent;
import React from 'react';

const Entry = (props) => {
    const type = {
        completed: "alert alert-warning",
        ongoing: "alert alert-success",
        upcoming: "alert alert-info"
    };
    var currentType = null;
    if (props.entryData.status === 0) { currentType = type.completed }
    else if (props.entryData.status === 1) { currentType = type.ongoing }
    else {currentType = type.upcoming};
    if (props.entryOpen.rolled && props.entryOpen.id == props.id) {
    return (    
        <div className={`${currentType} rolledEntry` } id={[props.id, props.entryData.status]} role="alert" style={{lineHeight: "0.15rem", margin: "0 0.4rem 0.5rem 0.5rem"}}>
            <form onSubmit={props.handleUpdateForm}> 
                <div className="form-group" >
                <label>Name</label>
                    <input
                        type="text" 
                        name="name"
                        className="form-control" 
                        value={props.entryData.traveler}
                        onChange={this.handleFilling}
                    />
                </div>
                <div className="form-group">
                <label>Destination</label>
                    <input 
                        type="text" 
                        name="destination"
                        className="form-control" 
                        value={props.entryData.destination}
                    />
                </div>
                <div className="form-group">
                <label>Date</label>
                    <input 
                        type="text" 
                        name="date"
                        className="form-control"
                        value={props.entryData.date}                
                    />
                </div>
                <div className="form-group">
                <label>Budget</label>
                    <input 
                        type="text" 
                        name="budget"
                        className="form-control" 
                        value={props.entryData.budget}                
                    />
                </div>
                <div className="form-group">
                <label>Goal</label>
                    <input 
                        type="text"
                        name="goal"
                        className="form-control"
                        value={props.entryData.goal} 
                    />
                </div>
                <hr />
                <button type="submit" className="btn btn-light" >Delete</button>
                <button type="submit" className="btn btn-info" >Save</button>
            </form>
        </div>
    );   
   } else {
        return (    
            <div className={currentType} id={[props.id, props.entryData.status]} role="alert" style={{lineHeight: "0.15rem", margin: "0 0.4rem 0.5rem 0.5rem"}}>
                {props.entryData.traveler}
                <hr />
                {props.entryData.destination}
                <hr />
                {props.entryData.date} 
            </div>
        );
    }    
}
export default Entry;
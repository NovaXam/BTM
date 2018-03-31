import React, {Component} from 'react';
import axios from 'axios';
import './style/form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            secondName: "",
            city: "",
            budget: "",
            time: "",
            goal: "",
            status: null
        }
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.handleFilling = this.handleFilling.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleCloseForm(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.setForm();
    };


    handleFilling(e) {
        e.preventDefault();
        e.stopPropagation();
        switch(e.target.name) {
            case "firstName": this.setState({firstName: e.target.value});
            break;
            case "secondName": this.setState({secondName: e.target.value});
            break;
            case "city": this.setState({city: e.target.value});
            break;
            case "budget": this.setState({budget: e.target.value});
            break;
            case "time": this.setState({time: e.target.value});
            break;
            case "goal": this.setState({goal: e.target.value});
            break;
            case "status": this.setState({status: e.target.value});
            break;
        }
    }

    handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.setForm();
        const objForDb = {
            traveler: (this.state.firstName + " " + this.state.secondName).toLowerCase(),
            city: this.state.city.toLowerCase(),
            budget: parseFloat(this.state.budget),
            time: new Date(this.state.time),
            goal: this.state.goal
        }
        switch(e.target[6].value) {
            case "completed": objForDb["status"] = 0;
            break; 
            case "ongoing": objForDb["status"] = 1;
            break; 
            case "upcoming": objForDb["status"] = 2;
            break; 
        };
        this.setState({
            firstName: "",
            secondName: "",
            city: "",
            budget: "",
            time: "",
            goal: "",
            status: null
        });
        this.props.addNewItem(objForDb);
    };

    render() {
        return (
            <div className="form" style={{margin: "1rem auto", width: "100%", backgroundColor: "lightblue", borderRadius: "0.5em"}}>
                <button type="submit" className="btn btn-outline-info" style={{float: "right", border: "none", margin: "0.25rem" }} onClick={this.handleCloseForm}>X</button>
                <form style={{paddingTop: "1rem", textAlign: "center"}} onSubmit={this.handleSubmit} >
                    <div className="form-group row no-gutters"> 
                        <div className="col col-mx-mb-6 sm-4 inputAddTripField">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="firstName"
                                placeholder="First name" 
                                value={this.state.firstName}
                                onChange={this.handleFilling}
                            />
                        </div>
                        <div className="col col-mx-mb-6 sm-4 inputAddTripField">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="city"
                                placeholder="Destination city"
                                value={this.state.city}
                                onChange={this.handleFilling}
                            />
                        </div>
                    </div>
                    <div className="form-group row no-gutters">
                        <div className="col col-mx-mb-6 sm-4 inputAddTripField">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Budget"
                                name="budget"
                                value={this.state.budget}
                                onChange={this.handleFilling}
                            />
                        </div>
                        <div className="col col-mx-mb-6 sm-4 inputAddTripField"> 
                            <input 
                                type="text" 
                                className="form-control" 
                                name="secondName"
                                placeholder="Second name" 
                                value={this.state.secondName}
                                onChange={this.handleFilling}
                            />
                        </div>
                    </div>
                    <div className="form-group row no-gutters">
                        <div className="col col-mx-mb-6 sm-4 inputAddTripField">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="MM-DD-YYYY" 
                                name="time"
                                value={this.state.time}
                                onChange={this.handleFilling}
                            />
                        </div>
                        <div className="col col-mx-mb-6 sm-4 inputAddTripField">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Goal"
                                name="goal"
                                value={this.state.goal}
                                onChange={this.handleFilling}
                            />
                        </div>
                    </div>
                    <div className="form-group row no-gutters">
                        <div className="col col-mx-mb-10 sm-4 inputAddTripField">
                            <select 
                                className="form-control" 
                                name="status"
                                onChange={this.handleFilling}
                            >
                                <option>choose a trip status</option>
                                <option>completed</option>
                                <option>ongoing</option>
                                <option>upcoming</option>
                            </select>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col col-sm=-12"> 
                            <button type="submit" className="btn btn-primary" style={{margin: "1rem"}}>Add trip</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;
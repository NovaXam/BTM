import React, {Component} from 'react';
import axios from 'axios';
import './style/form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            destination: "",
            budget: "",
            date: "",
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
            case "name": this.setState({name: e.target.value});
            break;
            case "destination": this.setState({destination: e.target.value});
            break;
            case "budget": this.setState({budget: e.target.value});
            break;
            case "date": this.setState({date: e.target.value});
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
        console.log(this.state);

        //finish after db is hooked up

        // axios.post('/newItem', this.state)
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    };

    render() {
        return (
            <div className="form" style={{margin: "1rem auto", width: "40rem", backgroundColor: "lightblue", borderRadius: "1em"}}>
                <button type="submit" className="btn btn-outline-info" style={{position: "relative", border: "none", top: "1rem", left: "18rem"}} onClick={this.handleCloseForm}>X</button>
                <form style={{width: "35rem", margin: "0rem auto", paddingTop: "1rem"}} onSubmit={this.handleSubmit} >
                    <div className="row no-gutters"> 
                        <div className="col col-sm-6">                            
                            <div className="form-group inputAddTripField" >
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="firstName"
                                    placeholder="First name" 
                                    value={this.state.name}
                                    onChange={this.handleFilling}
                                />
                            </div>
                            <div className="form-group inputAddTripField">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="destination"
                                    placeholder="Destination"
                                    value={this.state.destination}
                                    onChange={this.handleFilling}
                                />
                            </div>
                            <div className="form-group inputAddTripField">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Budget"
                                    name="budget"
                                    value={this.state.budget}
                                    onChange={this.handleFilling}
                                />
                            </div>
                        </div>
                        <div className="col col-sm-6"> 
                            <div className="form-group inputAddTripField">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="lastName"
                                    placeholder="Second name" 
                                    value={this.state.name}
                                    onChange={this.handleFilling}
                                />
                            </div>
                            <div className="form-group inputAddTripField">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="MM-DD-YYYY" 
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.handleFilling}
                                />
                            </div>
                            <div className="form-group inputAddTripField">
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
                    </div>
                    <div className="row no-gutters">
                        <div className="col col-sm-12">
                            <div className="form-group inputAddTripField">
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
import React, {Component} from 'react';
import Scroll from 'react-scroll';
import axios from 'axios';

const Element = Scroll.Element;

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
        <Element name="Form">
            <div style={{margin: "1rem auto", width: "40rem", backgroundColor: "lightblue", borderRadius: "1em"}}>
                <button type="submit" className="btn btn-outline-info" style={{position: "relative", border: "none", top: "1rem", left: "18rem"}} onClick={this.handleCloseForm}>X</button>
                <form style={{width: "20rem", margin: "0rem auto", paddingTop: "1rem"}} onSubmit={this.handleSubmit} >
                    <div className="form-group" >
                        <label>Name of the traveler</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            placeholder="Enter full name" 
                            value={this.state.name}
                            onChange={this.handleFilling}
                        />
                    </div>
                    <div className="form-group">
                        <label>Destination</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="destination"
                            placeholder="Destination"
                            value={this.state.destination}
                            onChange={this.handleFilling}
                        />
                    </div>
                    <div className="form-group">
                        <label>Budget</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Budget"
                            name="budget"
                            value={this.state.budget}
                            onChange={this.handleFilling}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="MM-DD-YYYY" 
                            name="date"
                            value={this.state.date}
                            onChange={this.handleFilling}
                        />
                    </div>
                    <div className="form-group">
                        <label>Goal</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Goal"
                            name="goal"
                            value={this.state.goal}
                            onChange={this.handleFilling}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
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
                    <button type="submit" className="btn btn-primary">Add trip</button>
                </form>
            </div>
        </Element>
        )
    }
}

export default Form;
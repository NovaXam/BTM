import React, { Component } from 'react';
import Form from './Form';

import './style/addNewTrip.css';

class AddNewTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formTripState: "closedFormTrip"
        }

        this.handleOpenForm =this.handleOpenForm.bind(this);
        this.setForm = this.setForm.bind(this);
    };

    handleOpenForm(e) {
        e.preventDefault();
        this.setState({
            formTripState: "openedFormTrip"
        })
    };

    setForm() {
        this.state.formTripState == "closedFormTrip" ? 
        this.setState({
            formTripState: "openedFormTrip"
        }) : 
        this.setState({
            formTripState: "closedFormTrip"
        });
    }

    render() {
        return (  
            <div className={this.state.formTripState} style={{margin: "0rem 0rem 0rem"}} >
                <button type="submit" className="btn btn-outline-info" style={{width: "15rem", height: "3rem", margin: "0.5rem"}} onClick={this.handleOpenForm}>
                    <h3 style={{marginTop: "0"}}>Add new trip </h3>
                </button>
                <Form 
                    setForm={this.setForm} 
                    addNewItem={this.props.addNewItem}
                />
            </div>
        )
    }
}
 
export default AddNewTrip;
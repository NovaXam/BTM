import React from 'react';
import '../../style/field.css';

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editableState: false,
            value: this.props.data
        };
        this.handleModifiedField = this.handleModifiedField.bind(this);
    };

    handleModifiedField(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            editableState: false
        });
        this.props.updateTraveler(e.target[0]["name"], e.target[0].value);
    };

    render() {
        console.log(this.state.editableState);
        if (!this.state.editableState) {
            return (
                <div className="row no-gutters field" ref="field" style={{margin: "0rem 0rem 0rem", height: "3.5rem", overflowX: "auto"}} onClick={(e) => this.setState({editableState: true})}>
                    <p className="col col-sm-12 temperature"><em>{this.props.fieldName}</em></p>
                    <h5 id={this.props.id} className="col col-sm-12" value={this.props.data} style={{paddingRight: "1rem"}}>{this.props.data}</h5>
                </div>
            )
        }
        else {
            return (
                <div className="row no-gutters editableField" ref="field" style={{margin: "0rem 0rem 0rem", height: "3.5rem", overflowX: "auto"}} onSubmit={this.handleModifiedField}>
                    <p className="col col-sm-12 temperature"><em>{this.props.fieldName}</em></p>
                    <form> 
                        <input
                            id={this.props.id} 
                            className="col col-sm-12 editableLine" 
                            name={this.props.fieldName}
                            value={this.state.value} 
                            style={{paddingRight: "1rem"}} 
                            onChange={(e) => this.setState({value: e.target.value}) }
                        />
                    </form>
                </div>
            )
        }
    }
};

export default Field;

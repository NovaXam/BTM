import React from 'react';
import '../../style/field.css';

class DinamicFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editableState: false,
            value: this.props.data
        };
        this.handleModifiedFieldOnSubmit = this.handleModifiedFieldOnSubmit.bind(this);
    };

    handleModifiedFieldOnSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            editableState: false
        });
        this.props.updateTraveler(e.target[0]["name"], e.target[0].value);
    };

    render() {
        if (!this.state.editableState) {
            return (
                <div className="row no-gutters field" style={{margin: "0rem 0rem 0rem", minHeight: "3.5rem"}} onClick={() => this.setState({editableState: true, value: this.props.data})}>
                    <p className="col col-sm-12 temperature"><em>{this.props.fieldName}</em></p>
                    <h5 id={this.props.id} className="col col-sm-12 dynamic" value={this.props.data} style={{paddingRight: "1rem"}}>{this.props.data}</h5>
                </div>
            )
        }
        else {
            console.log(this.state.value);
            return (
                <div className="row no-gutters editableField" style={{margin: "0rem 0rem 0rem", minHeight: "3.5rem"}} onSubmit={this.handleModifiedFieldOnSubmit}>
                    <p className="col col-sm-12 temperature"><em>{this.props.fieldName}</em></p>
                    <div className="form-group">
                        <form > 
                            <input
                                id={this.props.id} 
                                className="col col-sm-12 editableLine form-control" 
                                name={this.props.fieldName}
                                value={this.state.value} 
                                style={{paddingRight: "1rem"}} 
                                onChange={(e) => this.setState({value: e.target.value}) }
                            />
                        </form>
                    </div>
                </div>
            )
        }
    }
};

export default DinamicFields;

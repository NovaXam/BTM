import React, {Component} from 'react';
import EntryContent from './EntryContent';

import './style/entry.css';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrySlideClass: "entryClosed",
            localData: {}
        }
        this.handleRollerAndContent = this.handleRollerAndContent.bind(this);
        this.handleFilling = this.handleFilling.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
    };

    componentWillMount() {
        this.setState({
            localData: this.props.entryData
        })
    }

    handleRollerAndContent(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log()
        if (this.state.entrySlideClass == "entryClosed") {
        this.setState({
                entrySlideClass: "entryOpened",
            });
        }
    };

    handleCloseForm() {
        this.setState({
            entrySlideClass: "entryClosed",
        });
    };

    handleFilling(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.value);
        this.setState({
           localData: e.target.value
        });
    };

    render() {
        console.log(this.state.localData);
        return (    
            <div 
                style={{lineHeight: "0.1rem", margin: "0.5rem 0.5rem 0.5rem 0.5rem", padding: "0.25rem 0.5rem"}} 
                className={`${this.props.type} ${this.state.entrySlideClass}`}
                id={this.props.id} 
                role="alert" 
                >
                <EntryContent  
                    status={this.state.entrySlideClass}
                    handleRollerAndContent={this.handleRollerAndContent}
                    handleUpdateForm={this.props.handleUpdateForm} 
                    handleFilling={this.handleFilling} 
                    localData={this.state.localData}
                    handleCloseForm={this.handleCloseForm}
                />
            </div>
        );   
    };
};

export default Entry;
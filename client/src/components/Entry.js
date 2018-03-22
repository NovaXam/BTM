import React, {Component} from 'react';
import EntryContent from './EntryContent';

import './style/entry.css';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrySlideClass: "entryClosed",
            statusView: "",
            localData: {}
        }
        this.handleRollerAndContent = this.handleRollerAndContent.bind(this);
        this.handleFilling = this.handleFilling.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.handleRollerView = this.handleRollerView.bind(this);
        this.handleSaveForm = this.handleSaveForm.bind(this);
    };

    componentWillMount() {
        this.setState({
            localData: {...this.props.entryData}
        })
    }

    handleRollerAndContent(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log()
        if (this.state.entrySlideClass == "entryClosed") {
        this.setState({
            statusView: "entryOpenedToExtendView",
            entrySlideClass: "entryOpenedView"
            });
        }
    };

    handleRollerView(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            statusView: "entryOpenedToEdit",
            entrySlideClass: "entryOpened"
        });
    }

    handleCloseForm() {
        this.setState({
            entrySlideClass: "entryClosed",
            statusView: "",
            localData: this.props.entryData
        });
    };

    handleSaveForm(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            entrySlideClass: "entryOpened",
            statusView: "entryOpenedToExtendView",
            localData: this.state.localData
        });
    }

    handleFilling(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.name);
        var obj =  this.state.localData;
        obj[e.target.name] = e.target.value;
        this.setState({
           localData: obj
        });
    };

    render() {
        return (    
            <div 
                style={{lineHeight: "0.1rem", margin: "0.5rem 0.5rem 0.5rem 0.5rem"}} 
                className={`${this.props.type} ${this.state.entrySlideClass}`}
                id={this.props.id} 
                role="alert" 
                >
                <EntryContent  
                    id={this.props.entryData.id}
                    statusView={this.state.statusView}
                    handleRollerAndContent={this.handleRollerAndContent}
                    handleRollerView={this.handleRollerView}
                    handleUpdateForm={this.props.handleUpdateForm} 
                    handleButtonForm={this.props.handleButtonForm}
                    handleFilling={this.handleFilling} 
                    localData={this.state.localData}
                    handleCloseForm={this.handleCloseForm}
                    handleSaveForm={this.handleSaveForm}
                />
            </div>
        );   
    };
};

export default Entry;
import React, {Component} from 'react';
import EntryContent from './EntryContent';
import axios from 'axios';

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
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
        this.handleButtonForm = this.handleButtonForm.bind(this);
    };

    componentWillMount() {
        this.setState({
            localData: {...this.props.entryData}
        })
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            localData: {...nextProps.entryData}
        });
    };

    handleRollerAndContent(e) {
        e.preventDefault();
        e.stopPropagation();
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
            localData: {...this.props.entryData}
        });
    };

    handleFilling(e) {
        e.preventDefault();
        e.stopPropagation();
        var obj = {...this.state.localData};

        obj[e.target.name] = e.target.value;
        this.setState({
           localData: obj
        });
    };

    handleUpdateForm(e) {
        e.preventDefault();
        e.stopPropagation();
        var dataToDb = {};
        for(let i = 0; i < 7; i++) {
            if (e.target[i].name == "date") {
                dataToDb["date"] = new Date(e.target[i].value);
            } else {
                dataToDb[`${e.target[i].name}`] = e.target[i].value;
            }
        };

        this.props.modifyData(dataToDb);
        this.setState({
            statusView: "entryOpenedToExtendView",
            entrySlideClass: "entryOpenedView",
            localData: {...this.props.entryData}
        });
      };
      
      handleButtonForm(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.modifyData(e.target.id);
        this.setState({
            statusView: "",
            entrySlideClass: "entryClosed",
            localData: this.props.entryData
        });
      };
      
    render() {
        return (
            <div 
                style={{lineHeight: "0.1rem", margin: "0.5rem 0.5rem 0.5rem 0.5rem", cursor: "pointer"}} 
                className={`${this.props.type[2]} ${this.state.entrySlideClass}`}
                id={this.props.id} 
                role="alert" 
                >
                <EntryContent  
                    id={this.props.entryData.id}
                    statusView={this.state.statusView}
                    handleRollerAndContent={this.handleRollerAndContent}
                    handleRollerView={this.handleRollerView}
                    handleUpdateForm={this.handleUpdateForm} 
                    handleButtonForm={this.handleButtonForm}
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
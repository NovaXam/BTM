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
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
        this.handleButtonForm = this.handleButtonForm.bind(this);
        this.switchFunc = this.switchFunc.bind(this);
    };

    componentWillMount() {
        this.setState({
            localData: this.switchFunc(this.props.entryData)
        })
    };

    switchFunc(data) {
        let obj = {...data}; 
        switch(data.status) {
            case 0 : obj["status"] = "completed";
            break;
            case 1 : obj["status"] = "ongoing";
            break;
            case 2 : obj["status"] = "upcoming";
            break;
        }
        return obj;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            localData: this.switchFunc(nextProps.entryData)
        });
    };

    handleRollerAndContent(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.handleClickForAsideBar(e.target.id);
        this.props.asideTrigger();

        if (this.state.entrySlideClass == "entryClosed") {
            this.setState({
                statusView: "entryOpenedToExtendView",
                entrySlideClass: "entryOpenedView"
            });
        };
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
            localData: this.switchFunc(this.props.entryData)
        });
    };

    handleFilling(e) {
        e.preventDefault();
        e.stopPropagation();
        var obj = this.state.localData;
        obj[e.target.name] = e.target.value;
        this.setState({
            localData: {...obj}
        });
    };

    handleUpdateForm(e) {
        e.preventDefault();
        e.stopPropagation();
        var dataToDb = {};
        for(let i = 0; i < 7; i++) {
            if (e.target[i].name == "time") {
                dataToDb["time"] = new Date(e.target[i].value.slice(6), (parseInt(e.target[i].value.slice(3,5))-1).toString(), e.target[i].value.slice(0, 2));
            } else if (e.target[i].name == "status") {
                switch(e.target[6].value) {
                    case "completed": dataToDb["status"] = 0;
                    break; 
                    case "ongoing": dataToDb["status"] = 1;
                    break; 
                    case "upcoming": dataToDb["status"] = 2;
                    break; 
                };
            } else {
                dataToDb[`${e.target[i].name}`] = e.target[i].value;
            }
        };
        this.props.modifyData(dataToDb);
        this.setState({
            statusView: "",
            entrySlideClass: "entryClosed",
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
                className={`${this.props.type[2]} ${this.state.entrySlideClass}`}
                id={this.props.id} 
                role="alert"
                name="randomContainer"
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
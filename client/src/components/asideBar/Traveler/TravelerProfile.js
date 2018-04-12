import React from 'react';
import DinamicFields from './DinamicFields';
import StaticFields from './StaticFields';
import Autocomplete from 'react-autocomplete';

class TravelerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialFieldValueTraveler) {
            this.setState({
                inputValue: ''
            });
        }
    };

    render() {
    let valsStatic = Object.values(this.props.profileTraveler).slice(4);
    let keysStatic = Object.keys(this.props.profileTraveler).slice(4);
    let valsDinamic = Object.values(this.props.profileTraveler).slice(0, 4);
    let keysDinamic = Object.keys(this.props.profileTraveler).slice(0, 4);
        return (
            <div className="col col-sm-auto WTcontainer"
                    style={{width: `${this.props.widthBar}`,
                    borderTop: "0.1rem solid lightgray",
                    borderLeft: "0.1rem solid lightgray",
                    borderBottom: "0.1rem solid lightgray",
                    transition: "width 2s",
                    overflow: "hidden",
                    background: "rgba(248, 249, 250, 0.9)"}}
                >
                    <div className="row no-gutters">
                        <div className="col col-sm-10" style={{margin: "1rem auto", padding: "0.25rem", position: "relative", display: "inline-block", borderRadius: '0.25rem'}}>
                            <Autocomplete
                                getItemValue={(item) => item.label}
                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                items={this.props.travelersList}
                                renderItem={(item, isHighlighted) =>
                                    <div className="dropDown" style={{width: "auto", background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.label}
                                    </div>
                                }
                                menuStyle={{indexZ: "+1"}}
                                value={this.state.inputValue}
                                onChange={(e) => {this.setState({inputValue: e.target.value})}}
                                onSelect={(val) => {
                                    this.setState({inputValue: val})
                                    this.props.handleTypeForTraveler(val)
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col col-sm-12">
                        {
                            keysDinamic.map((elem, i) => {
                                return (
                                    < DinamicFields
                                        fieldName={elem}
                                        data={valsDinamic[i]}
                                        key={i * Math.random()}
                                        id={++i * Math.random() / i }
                                        updateTraveler={this.props.updateTraveler}                                    
                                    />
                                )
                            })
                        }
                        { 
                            keysStatic.map((elem, i) => {
                                return (
                                    < StaticFields 
                                        fieldName={elem}
                                        data={valsStatic[i]}
                                        key={i * Math.random()}
                                        id={++i * Math.random() / i }
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
            </div>
        )
    }
};

export default TravelerProfile;
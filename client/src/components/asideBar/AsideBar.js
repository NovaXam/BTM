import React, {Component} from 'react';
import WeatherTime from './Weather/WeatherTime';
import { key } from '../../assets/LocalStorage';
import axios from 'axios';

import BarMenu from './BarMenu';
import TravelerProfile from './Traveler/TravelerProfile';
import '../style/asideBar.css';

class AsideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputCity: "",
            data: {
                weather: [],
                cityRate: null,
                time: []
            },
            widthBar: "0%",
            barStatus: null,
            barName: ["Weather", "Traveler", "Services"],
            barAttributes: [{
                barBorder: "0.1rem solid lightgray",
                backColor: "",
                status: false
            },
            {
                barBorder: "0.1rem solid lightgray",
                backColor: "",
                status: false
            },
            {
                barBorder: "0.1rem solid lightgray",
                backColor: "",
                status: false
            }]
        };

        this.handleSubApiWeather = this.handleSubApiWeather.bind(this);
        this.handleWTInput = this.handleWTInput.bind(this);
        this.handleBarClick = this.handleBarClick.bind(this);
        this.switchForBar = this.switchForBar.bind(this);
        this.handleSubTraveler = this.handleSubTraveler.bind(this);
        this.switcher = this.switcher.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        (nextProps.trigger && this.state.widthBar !== "83%")
            ?
                this.switcher()
            :
                false;
    };

    switcher() {
        let obj = {
            barBorder: "0rem",
            backColor: "rgba(248, 249, 250)",
            status: true
        };
        let obj1 = {
            barBorder: "0.1rem solid lightgray",
            backColor: "",
            status: false
        };
        let arr = [];
        this.state.barAttributes.map((elem, i) => {
            i == 1 ? arr.push(obj) : arr.push(obj1);
        });
        setTimeout(() => {
            this.setState({
                widthBar: "83%",
                barStatus: this.state.barName[1],
                barAttributes: [...arr]
            })
        }, 100)
        this.setState({
            widthBar: "0%",
            barStatus: this.state.barName[1],
            barAttributes: [...arr],
        });
    }

    //method to catch an input value onSubmit on an API weather form field. 
    handleWTInput(event) {
        console.log(event.target.value);
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            inputCity: event.target.value
        });
    };
  
    //calling all api's and handle promises for a weather, time and safety data.
    handleSubApiWeather(e) {
        e.preventDefault();
        e.stopPropagation();
        var score = "";
        const weather = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&units=metric&APPID=${key.apiWeather}`;
        if (this.state.inputCity.split(" ").length > 1) {
            const newString = this.state.inputCity.split(" ").join("-").toLowerCase();
            score = `https://api.teleport.org/api/urban_areas/slug:${newString.toLowerCase()}/scores/`;
        } else {
            score = `https://api.teleport.org/api/urban_areas/slug:${this.state.inputCity.toLowerCase()}/scores/`;
        };
        Promise.all([axios(weather), axios(score)])
        .then((res) => {
            var tempObj = {};
            let temp = Math.ceil(res[0].data.main.temp) + "˚C";
            let weather = [res[0].data.name, temp, res[0].data.weather[0].description];
            let cityRate = Math.round(res[1].data.categories[7].score_out_of_10);
            tempObj = {...[weather], cityRate};
            const time = `http://api.geonames.org/timezoneJSON?lat=${res[0].data.coord.lat}&lng=${res[0].data.coord.lon}&username=${key.apiTime}`;
            axios(time)
            .then((res) => {
                const time = res.data.time.split(" ");
                return tempObj = {...tempObj, time};
            })
            .then((res) => {
                this.setState({
                    data: res,
                    inputCity: ""
                })
            })
            .catch(err => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
      };

      handleSubTraveler(e) {
        e.preventDefault();
        e.stopPropagation();
        //make a calculation of traveler data on base of choosen critheria
        
      };

    //catching a click event from bar menu and redirect it to the appropriate switch function 
    handleBarClick(e) {
        console.log(e.target.id);
        switch(e.target.id) {
            case "0":
                this.switchForBar(this.state.barName[0], e.target.id);
            break;
            case "1": 
                this.switchForBar(this.state.barName[1], e.target.id);
            break;
            case "2": 
                this.switchForBar(this.state.barName[2], e.target.id);
            break;
            default: false;
            }
        };

    //according to click on particular bar update display status
    switchForBar(name, index) {
        let obj = {
            barBorder: "0rem",
            backColor: "rgba(248, 249, 250)",
            status: true
        };
        let obj1 = {
            barBorder: "0.1rem solid lightgray",
            backColor: "",
            status: false
        };
        let arr = [];
        this.state.barAttributes.map((elem, i) => {
            i == index ? arr.push(obj) : arr.push(obj1);
        });
        if (this.state.widthBar == "0%") {
            setTimeout(() => {
                this.setState({
                    widthBar: "83%",
                });
            }, 100);
            this.setState({
                widthBar: "0%",
                barStatus: name,
                barAttributes: [...arr],
            });
        } else if (this.state.barStatus !== name) {
            this.setState({
                barAttributes: [...arr],
                barStatus: name,
                widthBar: "83%",
            });
        } else {
            this.setState({
                widthBar: "0%",
                data: {
                    weather: [],
                    cityRate: null,
                    time: []
                },
                barAttributes: [...[obj1, obj1, obj1]],
            });
            this.props.erazeProfileFields();
        }
    };

    render() {
        switch(this.state.barStatus) {
            case("Weather"):
                return (
                    <div className="row no-gutters smainContainerAside">
                        <WeatherTime
                            handleWTInput={this.handleWTInput}
                            handleSubApiWeather={this.handleSubApiWeather}
                            inputCity={this.state.inputCity}
                            data={this.state.data}
                            backColor={this.state.backColor}
                            widthBar={this.state.widthBar}
                        />
                        <BarMenu 
                            handleBarClick={this.handleBarClick}
                            barName={this.state.barName}
                            barAttributes={this.state.barAttributes}
                        /> 
                    </div>
                );
            break;
            case("Traveler"):
                return (
                    <div className="row no-gutters smainContainerAside">
                        <TravelerProfile
                             widthBar={this.state.widthBar}
                             handleSubTraveler={this.handleSubTraveler}
                             profileTraveler={this.props.profileTraveler}
                             updateTraveler={this.props.updateTraveler}
                        />
                        <BarMenu 
                            handleBarClick={this.handleBarClick}
                            barName={this.state.barName}
                            barAttributes={this.state.barAttributes}
                        /> 
                    </div>
                )
            default: 
                return (
                    <div className="row no-gutters smainContainerAside">
                         <div className="col col-sm-auto WTcontainer"
                            style={{
                                width: this.state.widthBar,
                                borderTop: "0.1rem solid lightgray", 
                                borderLeft: "0.1rem solid lightgray", 
                                borderBottom: "0.1rem solid lightgray", 
                                transition: "width 2s",
                                overflow: "hidden", 
                                background: "linear-gradient(rgba(248, 249, 250, 0.9), rgba(255, 255, 255, 0))"}}
                         >
                         </div>
                        <BarMenu 
                            handleBarClick={this.handleBarClick}
                            barName={this.state.barName}
                            barAttributes={this.state.barAttributes}
                        />
                    </div>
                    
                )
            }
        }
};

export default AsideBar;
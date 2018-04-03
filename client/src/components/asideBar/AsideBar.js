import React, {Component} from 'react';
import WeatherTime from './WeatherTime';
import { key } from '../../assets/LocalStorage';
import axios from 'axios';

class AsideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputCity: "",
            weather: [],
            time: [],
            cityScore: null,
            widthBar: "0%"
        };

        this.handleSubApi = this.handleSubApi.bind(this);
        this.handleWTInput = this.handleWTInput.bind(this);
        this.handleBarClick = this.handleBarClick.bind(this);
    };

    //method to catch an input value onSubmit on an API weather form field. 
    handleWTInput(event) {
        console.log(event.target.value);
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            inputCity: event.target.value
        });
    };
  
    handleSubApi(e) {
        e.preventDefault();
        e.stopPropagation();
        var score = "";
        const weather = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&units=metric&APPID=${key.apiWeather}`;
        if (this.state.inputCity.split(" ").length > 1) {
          const newString = this.state.inputCity.split(" ").join("-").toLowerCase();
          score = `https://api.teleport.org/api/urban_areas/slug:${newString.toLowerCase()}/scores/`;
        } else {
        //   picture = `https://api.teleport.org/api/urban_areas/slug:${this.state.inputCity.toLowerCase()}/images/`;
        score = `https://api.teleport.org/api/urban_areas/slug:${this.state.inputCity.toLowerCase()}/scores/`;
        };
        
        this.setState({
          inputCity: ""
        });

        Promise.all([axios(weather), axios(score)])
        .then((res) => {
            let temp = Math.ceil(res[0].data.main.temp) + "˚C";
            let city = Math.round(res[1].data.categories[7].score_out_of_10);
            console.log(res[1].data);
            this.setState({
                weather: [res[0].data.name, temp, res[0].data.main.humidity, res[0].data.weather[0].description],
                cityScore: city
            });
            const time = `http://api.geonames.org/timezoneJSON?lat=${res[0].data.coord.lat}&lng=${res[0].data.coord.lon}&username=${key.apiTime}`;
            axios(time)
            .then((data) => {
                const arr = data.data.time.split(" ");
                this.setState({
                    time: arr
                })
            });
        })
        .catch((err) => {
          console.log(err);
        });
      };

    handleBarClick(e) {
        console.log(e.target.id);
        switch(e.target.id) {
            case "weatherAndTime": 
                (this.state.widthBar == "0%") 
                ? 
                    this.setState({
                        widthBar: "90%"
                    })
                :
                    this.setState({
                        widthBar: "0%",
                        inputCity: "",
                        weather: [],
                        time: [],
                        cityScore: null
                    });
            break;
            default: false;
            }
        };
      
    render() {
        return (
            <div className="smainContainerAside">
                <WeatherTime 
                    handleWTInput={this.handleWTInput}
                    handleSubApi={this.handleSubApi}
                    inputCity ={this.state.inputCity}
                    weather={this.state.weather}
                    time={this.state.time}
                    cityScore={this.state.cityScore}
                    handleBarClick={this.handleBarClick}
                    widthBar={this.state.widthBar}
                />
            </div>
        );
    }
};

export default AsideBar;
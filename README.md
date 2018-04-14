# Business trip manager

## Technologies in use:
   - React
   - D3
   - Bootstrap
   - Spring
   - Java
   - PSQL
   - Docker
   - Flyway
   - Gradle
   - External API

## Screens: 
   - Main
   - Add new trip
   - Graphs
   - Personal traveler page
   - Services
   - Information

## Ideas for SPA:

Business trip manager aimes to help to improve company's business trips management experience.
Track all company business' trips in one app with extended functionality and friendly analytic tools. It allows to add new business trip, update information about an existing one, delete/cancel entry from the list, observe all trips on the screen arranged by categories: Completed, In progress, Upcoming.

## Components structure and their content:

  1. Trip tracker:
   - Competed: trips with representation of a list of 10 trips by screen (grey)
   - In progress: trips with representation of a list of 10 trips by screen (green)
   - Upcoming: trips with representation of a list of 10 trips by screen (blue)

  2. Add new trip:
   - form to add a new business trip:
		- name
		- designation
		- budget(could be extended by detailed expenditures)
		- duration
		- goal
		- status(done, in progress, upcoming)
		- button to save
		- button to cancel
  3. Weather & Time

  4. Graphs:
	- Start input
	- End input
	- Build button
	- Budget total per month
	- Frequency and duration	
	- Destination

## Functionality of the component: 
   - onClick = slightly extend entry from in a list with an option to edit and delete.
   - onBlur = save a trip profile
   - check for empty fields
   - check for data type
   - check for a value

## Flow chart
![alt text](https://github.com/NovaXam/BTM/blob/master/Planning/BTM.png)


## DB scheme
![alt text](https://github.com/NovaXam/BTM/blob/master/Planning/DB_Scheme.png)

## UI
   ### Persona:
   - company HR person, accountant
   - entrepreneur / business men
   - traveler

   ### Epic:
   #### HR / accountant:
   > As a person in charge to manage and control many internal operations in the company, I need a logical and straightforward represantation of the data about employees' trips on the page. In the best case, this data should be arranged by time scope: Past, Present, Future. 
   Often I need to make rapports for different department. It would be nice to have a tools to build graphs on base of a particular time scale.

   #### Entrepreneur
   > I wish to be able to track my business trip activity in order to be able to optimize travel expenditure. 

   #### Traveler
   > Before to go to a new place I am always curious about the weather conditions and local time.
   Having bad experience with overlooking these small details in the past unexpectedly turned my travels to the wrong way.

   ### User story of web-app:
 Entering the main page a user sees Trip tracker at the  center of the page.
 Above Trip tracker there is a Graphs block navigation block.
 At the left side of the screen is Weather block.
 At the left side of the screen there is Fancy logo
 Trip tracker has a following functionality
    - short description of each item
    - scroll in each category fiel
    - onClick => extend the field of each entry in the list with revealing hidden part down
    - extended version of the entry besides the hidden fields has button delet
    - each field in the extended entry view could be edited by click on its area
    - all extended entries could be scrolled up by click on the head of the category
 
 Pressing Add new trip button a user opens a form to add new trip. A Form slides down revealing a field of the form need to be filled. All field are mandatory. In case to store the form with empty fields user gets a red flag please fill all the fields before to save the form. 
 
 There are two buttons at the bottom of the form. User can cancel or save the filled form.
 If a user hits Cancel button, form field scrolled up. If a user hits Save button form is added to the appropriate list of trips on the Trip tracker block.
 At the top of the page above Trip tracker there is Graphs block. It consists of three navigation button. Each button lead to the particular data representation
 Hitting the Graph button, particular graph area scrolled up. By default it represents data for the last 12 months. On the left hand from the graph there is a navigation block consists of two input field start and end. Using them a user can customize the time range represented on the graph
 Below these input fields there is a button Build. Hitting the button user update an information on the graph. If some of the field empty or if a range of the fields is not correct (a start date is later than end date) user get a red flag please verify your input. In this case the graph keeps the previous successful build. If the data inserted by user is correct, the state of a graph is updated
 In the upper right corner of the Graph area there is a cross button. User uses it to close the page
 
 When user hits the cross button page is scrolled down and the view leads user back to the main screen. If user hits the button of the other graph when another graph is opened, another graphs appear below or above of the current graph depends on its position in JSX code
 Extra features of the web-app is a weather and a time checkers
 User invited to type the name of the city to travel on the form placed right below the Trip tracker
 As soon as user hits the enter button the data in the fields weather and time updated according with a user request

## MockUp

![alt text](https://github.com/NovaXam/BTM/blob/master/Planning/graphs.JPG)

![alt text](https://github.com/NovaXam/BTM/blob/master/Planning/newTrip.JPG)

![alt text](https://github.com/NovaXam/BTM/blob/master/Planning/tripTracker.JPG)


## Schedule
  
| Day | Task | Time to complet, h | Status |
|---|---|---|---|
| 1.1 | mockUps, charts user flow, UX, UI, readme, |  2,  2,  2,  1  | done |
| 1.2 | build front-end, component structure of the app, write tests, content | 6, 2, 3  | done  |
| 1.3 | build css effects, D3 graphs |  3, 6  | done |
|  - |  #### MVP | 27 hours | done |
| 2.1 | Spring Boot architecture data base(MVC) |  12  | done |
| 2.2 | connect back-end and front-end, tests |  6, 3  | done |
| - | #### Version 1 |  21 hours  | done |
| 3.1 | add calendar option on the graph, fix bugs | 10, 2 | done |
| 3.2 | redesign a grid | 12 | done |
| 3.3 | update an Add trip form | 4 | done |
| - | #### Version 2 | 28 hours | - 
| 4.1 | add sort option for dashboard | 8 | done |
| 4.2 | add horizontal menu | 12 | done |
| 4.3 | add traveler profile page | 24 | done |
| - | #### Version 3 | 44 hours | - |
| 5.1 | unit, integration, feature tests | 24 | upcoming |
| - | #### Deployment  V 1.01 | 24 | upcoming |
| 6.1 | add authentification | 16 | upcoming |
| 6.2 | improve UI | 16 | upcoming |
| - | #### Version 1.20 | 32 hours | - |
| 7.1 | add Services sidebar | 8 | upcoming |
| 7.2 | add hotels page | 24 | upcoming |
| 7.3 | add map page | 16 | upcoming |
| 7.4 | add sightseeings page | 24 | upcoming |
| 7.5 | testing | 16 | upcoming |
| - | #### Version 2.00 | 88 hours | - |
| 8.1 | rebuild back-end using microservices | 40 | upcoming | 
| - | #### Version 2.01 | 40 hours | - |
| 9.1 | rebuild front-end using redux | upcoming |
| - | #### Version 2.2 | 40 hours | - |
|10.1 | extend analytical tools | 40 | upcoming |
| - | #### Version 3.01 | 40 hours | - |

## Code snippet
```JS
handleSubApi(e) {
  e.preventDefault();
  
  const weather = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&units=metric&APPID=${key}`;
  const picture = `https://api.teleport.org/api/urban_areas/slug:${this.state.inputCity.toLowerCase()}/images/`;
  console.log(e.target.ref);
  Promise.all([axios(weather), axios(picture)]).then((res) => {
    this.setState({
      weather: [res[0].data.name, res[0].data.main.temp, res[0].data.main.humidity, res[0].data.weather[0].description],
      pictureBack: res[1].data.photos[0].image.mobile
    });
    const time = `http://api.geonames.org/timezoneJSON?lat=${res[0].data.coord.lat}&lng=${res[0].data.coord.lon}&username=?????`;
    axios(time)
    .then((data) => {
      const arr = data.data.time.split(" ");
      this.setState({
        time: arr
      })
    }) 
  })
  .catch((err) => {
    console.log(err);
  });
}
```

```Java
@PostMapping("/trips")
    public Trip createNewTrip(@RequestBody Trip newTrip) {
        Place place;
        Traveler employee;
        if (placeRepository.findByName(newTrip.getDestination().getCity()) == null) {
            placeRepository.save(newTrip.getDestination());
        };

        if (travelerRepository.findByName(newTrip.getTraveler().getName()) == null) {
            travelerRepository.save(newTrip.getTraveler());
        };

        place = placeRepository.findByName(newTrip.getDestination().getCity());
        employee = travelerRepository.findByName(newTrip.getTraveler().getName());

        newTrip.setDestination(place);
        newTrip.setTraveler(employee);

        return tripRepository.save(newTrip);
    };

    @DeleteMapping("/trip/{tripId}")
    public HttpStatus deleteTrip(@PathVariable Long tripId) {
        tripRepository.deleteById(tripId);
        return HttpStatus.OK;
    };

    @PatchMapping("/trip/{tripId}")
    public Trip updateTrip(@PathVariable Long tripId, @RequestBody Trip newData) {
        Trip oldData = tripRepository.findById(tripId).get();

        if (newData.getTraveler() != null) {
            oldData.setTraveler(newData.getTraveler());
        };

        if (newData.getDestination() != null) {
            Place place = placeRepository.findByName(newData.getDestination().getCity());
            oldData.setDestination(place);
        };
        if (newData.getBudget() > 0) {
            oldData.setBudget(newData.getBudget());
        };
        if (newData.getGoal() != null) {
            oldData.setGoal(newData.getGoal());
        };
        if (newData.getTime() != null) {
            oldData.setTime(newData.getTime());
        };
        return oldData;
    };

```

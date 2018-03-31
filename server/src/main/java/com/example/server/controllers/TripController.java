package com.example.server.controllers;


import com.example.server.models.Place;
import com.example.server.models.Traveler;
import com.example.server.models.Trip;
import com.example.server.repositories.TravelerRepository;
import com.example.server.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.example.server.repositories.PlaceRepository;

import java.util.*;

@RestController
public class TripController {

    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private TravelerRepository travelerRepository;

    @GetMapping("/trips")
    public Iterable<Trip> findAllTrips() {
        return tripRepository.findAll();
    };

    @GetMapping("/trips/{tripId}")
    public Optional<Trip> findTripById(@PathVariable Long tripId) {
        return tripRepository.findById(tripId);
    };

    @PostMapping("/newtrip")
    public Trip createNewTrip(@RequestBody Trip newTrip) throws Exception {
        Place place;
        Traveler employee;
        String cityName = newTrip.getCity().getCityName();
        System.out.println(cityName);
        System.out.println(newTrip);
        System.out.println(placeRepository.findByCityName(cityName));

        if (placeRepository.findByCityName(cityName) == null) {
            placeRepository.save(newTrip.getCity());
            Iterable<Place> list = placeRepository.findAll();
            System.out.println(list);
        };

        System.out.println("I passed fist level");

        if (travelerRepository.findByEmployeeName(newTrip.getTraveler().getEmployeeName()) == null) {
            travelerRepository.save(newTrip.getTraveler());
        };

        System.out.println("I passed second level");

        place = placeRepository.findByCityName(newTrip.getCity().getCityName());
        employee = travelerRepository.findByEmployeeName(newTrip.getTraveler().getEmployeeName());

        newTrip.setCity(place);
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
        System.out.println(tripId);
        System.out.println(newData);
        Trip oldData = tripRepository.findById(tripId).get();
        Traveler employee;
        Place place;
        System.out.println(newData.getTraveler());
        System.out.println(newData.getCity());
        if (travelerRepository.findByEmployeeName(newData.getTraveler().getEmployeeName()) == null) {
            travelerRepository.save(newData.getTraveler());
            employee = travelerRepository.findByEmployeeName(newData.getTraveler().getEmployeeName());
            oldData.setTraveler(employee);
        } else {
            employee = travelerRepository.findByEmployeeName(newData.getTraveler().getEmployeeName());
            oldData.setTraveler(employee);
        };
        System.out.println("i pass traveler");

        if (placeRepository.findByCityName(newData.getCity().getCityName()) == null) {
            placeRepository.save(newData.getCity());
            place = placeRepository.findByCityName(newData.getCity().getCityName());
            oldData.setCity(place);
        } else {
            place = placeRepository.findByCityName(newData.getCity().getCityName());
            oldData.setCity(place);
        };
        System.out.println("i pass place");
        oldData.setBudget(newData.getBudget());
        oldData.setGoal(newData.getGoal());
        oldData.setTime(newData.getTime());
        System.out.println(newData.getTime());
        System.out.println("this is over");
        return oldData;
    };
};
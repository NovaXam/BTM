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
        Trip oldData = tripRepository.findById(tripId).get();
        System.out.println(tripId);
        if (newData.getTraveler() != null) {
            oldData.setTraveler(newData.getTraveler());
        };

        if (newData.getCity() != null) {
            Place place = placeRepository.findByCityName(newData.getCity().getCityName());
            oldData.setCity(place);
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
};
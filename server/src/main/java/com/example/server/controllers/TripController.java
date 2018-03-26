package com.example.server.controllers;


import com.example.server.models.Place;
import com.example.server.models.Traveler;
import com.example.server.models.Trip;
import com.example.server.repositories.TravelerRepository;
import com.example.server.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.server.repositories.PlaceRepository;

import java.util.Optional;

@RestController
public class TripController {

    @Autowired
    private TripRepository tripRepository;
    private PlaceRepository placeRepository;
    private TravelerRepository travelerRepository;

    @GetMapping("/trips")
    public Iterable<Trip> findAllTrips() {
        return tripRepository.findAll();
    };

    @GetMapping("/trips/{tripId}")
    public Optional<Trip> findTripById(@PathVariable Long tripId) {
        return tripRepository.findById(tripId);
    };

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
};
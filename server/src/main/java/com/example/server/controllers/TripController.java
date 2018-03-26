package com.example.server.controllers;


import com.example.server.models.Trip;
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
        int placeId, employeeId;
        PlaceRepository placeRepository;

        if (!placeRepository.findByName(newTrip.getDestination())) {
            placeRepository.save(newTrip.getDestination());
            newTrip.setDestination(placeRepository.findByName(newTrip.getDestination()));
        } else {
            newTrip.setDestination(placeRepository.findByName(newTrip.getDestination()));
        };
        if (!travelerRepository.findByName(newTrip.getTraveler())) {
            travelerRepository.save(newTrip.getTraveler());
            newTrip.setTraveler(travelerRepository.findByName((newTrip.getTraveler())));
        } else {
            newTrip.setTraveler(travelerRepository.findByName((newTrip.getTraveler())));
        };
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

        if (newData.getDestination() > 0) {
            placeRepository.findByName(newData.getDestination());
            oldData.setDestination(placeRepository.findByName(newData.getDestination()));
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

package com.example.server.controllers;

import com.example.server.models.Traveler;
import com.example.server.repositories.TravelerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class TravelerController {

    @Autowired
    public TravelerRepository travelerRepository;

    @GetMapping("/traveler")
    public Iterable<Traveler> findAllTravelers() {
        return travelerRepository.findAll();
    };

    @GetMapping("/traveler/{travelerId}")
    public Optional<Traveler> findTravelerById(@PathVariable Long travelerId) {
        return travelerRepository.findById(travelerId);
    };

    @PostMapping("/traveler")
    public Traveler createNewTraveler(@RequestBody Traveler newTraveler) {
        return travelerRepository.save(newTraveler);
    };

    @DeleteMapping("/traveler/{travelerId}")
    public HttpStatus deleteTraveler(@PathVariable Long travelerId) {
        travelerRepository.deleteById(travelerId);
        return HttpStatus.OK;
    };

    @PatchMapping("/traveler/{travelerId}")
    public Traveler updateTraveler(@PathVariable Long travelerId, @RequestBody Traveler newData) {
        Traveler oldData = travelerRepository.findById(travelerId).get();

        if (newData.getEmployeeName() != null) {
            oldData.setEmployeeName(newData.getEmployeeName());
        };
        if (newData.getPosition() != null) {
            oldData.setPosition(newData.getPosition());
        };
        if (newData.getPhone() != null) {
            oldData.setPhone(newData.getPhone());
        }
        if (newData.getEmail() != null) {
            oldData.setEmail(newData.getEmail());
        };

        return travelerRepository.save(oldData);
    };
}

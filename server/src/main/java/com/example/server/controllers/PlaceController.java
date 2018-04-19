package com.example.server.controllers;

import com.example.server.models.Place;
import com.example.server.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class PlaceController {

    @Autowired
    public PlaceRepository placeRepository;

    @GetMapping("/cities")
    public Iterable<Place> getAllCities() {
        return placeRepository.findAll();
    };

    @GetMapping("/cities/{cityId}")
    public Optional<Place> findCityById(@PathVariable Long cityId) {
        return placeRepository.findById(cityId);
    };

    @PostMapping("/cities")
    public Place createNewPlace(@RequestBody Place newPlace) {
        return placeRepository.save(newPlace);
    };

    @PatchMapping("/cities/{cityId}")
    public Place updateCityById(@PathVariable Long cityId, Place place) {
        Place updatedPlace = placeRepository.findById(cityId).get();
        updatedPlace.setCityName(place.getCityName());
        return updatedPlace;
    };

    @DeleteMapping("places/{cityId}")
    public HttpStatus deleteCityById(@PathVariable Long cityId) {
        placeRepository.deleteById(cityId);
        return HttpStatus.OK;
    };


}


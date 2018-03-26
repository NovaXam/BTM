package com.example.server.controllers;


import com.example.server.models.Place;
import com.example.server.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.yaml.snakeyaml.tokens.Token;

import java.util.Optional;

import static org.hibernate.hql.internal.antlr.SqlTokenTypes.SELECT;

public class PlaceController {

    @Autowired
    public PlaceRepository placeRepository;
    private String CITY;

    public int findByName(String name) {
//      return (  SELECT Token.ID from PLACES where CITY = name );
    };

    @GetMapping("/city/{cityId}")
    public Optional<Place> findCityById(@PathVariable Long cityId) {
        return placeRepository.findById(cityId);
    };

    @PostMapping("/city")
    public Place createNewPlace(@RequestBody Place newPlace) {
        placeRepository.save(newPlace);
    };
}


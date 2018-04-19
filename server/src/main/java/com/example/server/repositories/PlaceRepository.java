package com.example.server.repositories;


import com.example.server.models.Place;
import org.springframework.data.repository.CrudRepository;


public interface PlaceRepository extends CrudRepository<Place, Long>{
    Place findByCityName(String name);
};

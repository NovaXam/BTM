package com.example.server.repositories;

import com.example.server.models.Traveler;
import org.springframework.data.repository.CrudRepository;

public interface TravelerRepository extends CrudRepository<Traveler, Long>{
    Traveler findByName(String name);
}
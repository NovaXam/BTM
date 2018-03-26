package com.example.server.repositories;

import com.example.server.models.Trip;
import com.example.server.models.User;
import org.springframework.data.repository.CrudRepository;


public interface TripRepository extends CrudRepository<Trip, Long>{
};

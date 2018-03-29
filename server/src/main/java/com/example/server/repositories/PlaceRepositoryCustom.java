package com.example.server.repositories;


import com.example.server.models.Place;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepositoryCustom {
    Place findByCity(String city);
}

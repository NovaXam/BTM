package com.example.server.repositories;

import com.example.server.models.Place;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class PlaceRepositoryCustomImpl implements PlaceRepositoryCustom{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Place findByCity(String name) {
        Query query = entityManager.createNativeQuery("SELECT city FROM Place WHERE city = ?", Place.class);
        query.setParameter(1, name);

        return (Place)query.getSingleResult();
    };
}

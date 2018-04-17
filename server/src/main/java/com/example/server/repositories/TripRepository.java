package com.example.server.repositories;

import com.example.server.models.Trip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TripRepository extends CrudRepository<Trip, Long>{
    @Query(value="SELECT * FROM TRIPS t WHERE (t.STATUS_TRIP = :status) AND (t.TIME >= :first and t.TIME <= :second)", nativeQuery = true)
    public List<Trip> findByStatusAndTime(@Param("status") int status, @Param("first") Date first, @Param("second") Date second);

    @Query(value="SELECT * FROM TRIPS trips WHERE trips.STATUS_TRIP = :status AND trips.TIME >= :time", nativeQuery = true)
    public List<Trip> findByStatusAndTimeGraphs(@Param("status") int status, @Param("time") Date time);
};
